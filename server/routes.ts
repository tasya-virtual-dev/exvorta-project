import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { setupAuth } from "./auth";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy_key" });

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // API routes prefix with /api
  
  // User routes
  app.get("/api/users/current", async (req, res) => {
    try {
      // In a real app, you would get this from the session
      const user = await storage.getUserByUsername("ptmalindo");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  });

  // Project routes
  app.get("/api/export-projects", async (req, res) => {
    try {
      const userId = Number(req.query.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const projects = await storage.getProjectsByUserId(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  });

  app.get("/api/export-projects/current", async (req, res) => {
    try {
      // In a real app, you would get the current user ID from the session
      const user = await storage.getUserByUsername("ptmalindo");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const project = await storage.getCurrentProject(user.id);
      if (!project) {
        return res.status(404).json({ message: "No active project found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching current project" });
    }
  });

  app.get("/api/export-projects/:id", async (req, res) => {
    try {
      const projectId = Number(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });

  // Project stages routes
  app.get("/api/export-projects/current/steps", async (req, res) => {
    try {
      // In a real app, you would get the current user ID from the session
      const user = await storage.getUserByUsername("ptmalindo");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const project = await storage.getCurrentProject(user.id);
      if (!project) {
        return res.status(404).json({ message: "No active project found" });
      }
      const stages = await storage.getProjectStages(project.id);
      res.json(stages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project stages" });
    }
  });

  // Document routes
  app.get("/api/documents/required", async (req, res) => {
    try {
      const projectId = Number(req.query.projectId);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const documents = await storage.getDocuments(projectId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching documents" });
    }
  });

  app.get("/api/documents/templates", async (req, res) => {
    try {
      const templates = await storage.getDocumentTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document templates" });
    }
  });

  app.get("/api/export-projects/current/documents", async (req, res) => {
    try {
      // In a real app, you would get the current user ID from the session
      const user = await storage.getUserByUsername("ptmalindo");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const project = await storage.getCurrentProject(user.id);
      if (!project) {
        return res.status(404).json({ message: "No active project found" });
      }
      const documents = await storage.getDocuments(project.id);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project documents" });
    }
  });

  // Risk assessment routes
  app.get("/api/export-projects/current/risk-assessment", async (req, res) => {
    try {
      // In a real app, you would get the current user ID from the session
      const user = await storage.getUserByUsername("ptmalindo");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const project = await storage.getCurrentProject(user.id);
      if (!project) {
        return res.status(404).json({ message: "No active project found" });
      }
      const riskAssessment = await storage.getRiskAssessment(project.id);
      res.json(riskAssessment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching risk assessment" });
    }
  });

  // Market data routes
  app.get("/api/market-analysis", async (req, res) => {
    try {
      const productCategory = req.query.productCategory as string;
      const country = req.query.country as string;
      
      if (!productCategory) {
        return res.status(400).json({ message: "Product category is required" });
      }
      
      const marketData = await storage.getMarketData(productCategory, country);
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching market data" });
    }
  });

  // Recommended products routes
  app.get("/api/recommended-products", async (req, res) => {
    try {
      const productCategory = req.query.productCategory as string;
      const targetMarket = req.query.targetMarket as string;
      
      if (!productCategory || !targetMarket) {
        return res.status(400).json({ message: "Product category and target market are required" });
      }
      
      const recommendedProducts = await storage.getRecommendedProducts(productCategory, targetMarket);
      res.json(recommendedProducts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recommended products" });
    }
  });

  // Activity routes
  app.get("/api/activities", async (req, res) => {
    try {
      const userId = Number(req.query.userId);
      const limit = Number(req.query.limit) || 10;
      
      let activities;
      if (!isNaN(userId)) {
        activities = await storage.getActivitiesByUserId(userId, limit);
      } else {
        // In a real app, you would get the current user ID from the session
        const user = await storage.getUserByUsername("ptmalindo");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        activities = await storage.getActivitiesByUserId(user.id, limit);
      }
      
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching activities" });
    }
  });

  // AI routes
  app.post("/api/ai/market-analysis", async (req, res) => {
    try {
      const { productCategory, targetMarket } = req.body;
      
      if (!productCategory || !targetMarket) {
        return res.status(400).json({ message: "Product category and target market are required" });
      }
      
      // In a real implementation, this would call the OpenAI API
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a market analysis expert for exporters. Provide detailed market analysis in JSON format."
          },
          {
            role: "user",
            content: `Analyze the market demand for ${productCategory} in ${targetMarket}. Include market trends, competitive landscape, and opportunities.`
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const analysis = JSON.parse(content);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Error performing market analysis" });
    }
  });

  app.post("/api/ai/risk-assessment", async (req, res) => {
    try {
      const { projectData } = req.body;
      
      if (!projectData) {
        return res.status(400).json({ message: "Project data is required" });
      }
      
      // In a real implementation, this would call the OpenAI API
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a risk assessment expert for exporters. Provide detailed risk assessment in JSON format."
          },
          {
            role: "user",
            content: `Assess the export risks for ${projectData.productCategory} to ${projectData.targetMarket} at the ${projectData.exportStage} stage. Include risk factors and mitigation strategies.`
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const assessment = JSON.parse(content);
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Error performing risk assessment" });
    }
  });

  app.post("/api/ai/generate-document", async (req, res) => {
    try {
      const { documentType, projectData } = req.body;
      
      if (!documentType || !projectData) {
        return res.status(400).json({ message: "Document type and project data are required" });
      }
      
      // In a real implementation, this would call the OpenAI API
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a document generation expert for exporters. Generate the requested document in JSON format."
          },
          {
            role: "user",
            content: `Generate a ${documentType} for exporting ${projectData.productName} to ${projectData.targetMarket} for ${projectData.companyName}.`
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const document = JSON.parse(content);
      res.json(document);
    } catch (error) {
      res.status(500).json({ message: "Error generating document" });
    }
  });

  app.post("/api/ai/export-guidance", async (req, res) => {
    try {
      const { productCategory, targetMarket, currentStage } = req.body;
      
      if (!productCategory || !targetMarket || !currentStage) {
        return res.status(400).json({ message: "Product category, target market, and current stage are required" });
      }
      
      // In a real implementation, this would call the OpenAI API
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an export process guidance expert. Provide step-by-step guidance in JSON format."
          },
          {
            role: "user",
            content: `Provide export process guidance for ${productCategory} to ${targetMarket}. The exporter is currently at the ${currentStage} stage.`
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const guidance = JSON.parse(content);
      res.json(guidance);
    } catch (error) {
      res.status(500).json({ message: "Error getting export process guidance" });
    }
  });

  app.post("/api/ai/mitigation-suggestions", async (req, res) => {
    try {
      const { risks } = req.body;
      
      if (!risks) {
        return res.status(400).json({ message: "Risks data is required" });
      }
      
      // In a real implementation, this would call the OpenAI API
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a risk mitigation expert for exporters. Provide mitigation suggestions in JSON format."
          },
          {
            role: "user",
            content: `Suggest mitigation strategies for the following export risks: shipping delay (${risks.shippingDelay}%), payment security (${risks.paymentSecurity}%), regulatory compliance (${risks.regulatoryCompliance}%), and currency fluctuation (${risks.currencyFluctuation}%).`
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      const suggestions = JSON.parse(content);
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: "Error getting mitigation suggestions" });
    }
  });

  // AI Assistant chat endpoint for customer service
  app.post("/api/ai/assistant", async (req, res) => {
    try {
      const { message, conversation } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      
      // Import the OpenAI service
      const { getCustomerServiceResponse, isChatMessage } = await import("./services/openai");
      
      // Convert and validate the conversation history
      const conversationHistory = Array.isArray(conversation) 
        ? conversation.filter(msg => isChatMessage(msg))
        : [];
      
      // Get a response from OpenAI
      const response = await getCustomerServiceResponse(message, conversationHistory);
      
      // Add the new messages to the conversation history for the client to track
      const updatedConversation = [
        ...conversationHistory,
        { role: "user", content: message },
        { role: "assistant", content: response }
      ];
      
      res.json({ 
        response, 
        conversation: updatedConversation 
      });
    } catch (error: any) {
      console.error("Error with AI assistant:", error);
      res.status(500).json({ 
        error: "Error processing AI request", 
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
