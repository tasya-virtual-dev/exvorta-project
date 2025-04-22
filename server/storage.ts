import { 
  users, type User, type InsertUser,
  exportProjects, type ExportProject, type InsertExportProject,
  projectStages, type ProjectStage, type InsertProjectStage,
  documents, type Document, type InsertDocument,
  activities, type Activity, type InsertActivity,
  marketData, type MarketData, type InsertMarketData,
  riskAssessments, type RiskAssessment, type InsertRiskAssessment,
  recommendedProducts, type RecommendedProduct, type InsertRecommendedProduct
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // Session store for authentication
  sessionStore: any;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProject(id: number): Promise<ExportProject | undefined>;
  getProjectsByUserId(userId: number): Promise<ExportProject[]>;
  getCurrentProject(userId: number): Promise<ExportProject | undefined>;
  createProject(project: InsertExportProject): Promise<ExportProject>;
  updateProject(id: number, updates: Partial<ExportProject>): Promise<ExportProject>;
  
  // Project stages operations
  getProjectStages(projectId: number): Promise<ProjectStage[]>;
  getProjectStage(id: number): Promise<ProjectStage | undefined>;
  createProjectStage(stage: InsertProjectStage): Promise<ProjectStage>;
  updateProjectStage(id: number, updates: Partial<ProjectStage>): Promise<ProjectStage>;
  
  // Document operations
  getDocuments(projectId: number): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, updates: Partial<Document>): Promise<Document>;
  getDocumentTemplates(): Promise<any[]>;
  
  // Activity operations
  getActivitiesByUserId(userId: number, limit?: number): Promise<Activity[]>;
  getActivitiesByProjectId(projectId: number, limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Market data operations
  getMarketData(productCategory: string, country?: string): Promise<MarketData[]>;
  
  // Risk assessment operations
  getRiskAssessment(projectId: number): Promise<RiskAssessment | undefined>;
  createRiskAssessment(assessment: InsertRiskAssessment): Promise<RiskAssessment>;
  updateRiskAssessment(id: number, updates: Partial<RiskAssessment>): Promise<RiskAssessment>;
  
  // Recommended products operations
  getRecommendedProducts(productCategory: string, targetMarket: string): Promise<RecommendedProduct[]>;
}

import type { SessionStore } from "express-session";
import createMemoryStore from "memorystore";
import session from "express-session";

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private exportProjects: Map<number, ExportProject>;
  private projectStages: Map<number, ProjectStage>;
  private documents: Map<number, Document>;
  private activities: Map<number, Activity>;
  private marketDataEntries: Map<number, MarketData>;
  private riskAssessments: Map<number, RiskAssessment>;
  private recommendedProductsEntries: Map<number, RecommendedProduct>;
  private documentTemplates: any[];

  private currentUserId: number;
  private currentProjectId: number;
  private currentStageId: number;
  private currentDocumentId: number;
  private currentActivityId: number;
  private currentMarketDataId: number;
  private currentRiskAssessmentId: number;
  private currentRecommendedProductId: number;
  
  sessionStore: SessionStore;

  constructor() {
    this.users = new Map();
    this.exportProjects = new Map();
    this.projectStages = new Map();
    this.documents = new Map();
    this.activities = new Map();
    this.marketDataEntries = new Map();
    this.riskAssessments = new Map();
    this.recommendedProductsEntries = new Map();
    this.documentTemplates = [];

    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentStageId = 1;
    this.currentDocumentId = 1;
    this.currentActivityId = 1;
    this.currentMarketDataId = 1;
    this.currentRiskAssessmentId = 1;
    this.currentRecommendedProductId = 1;
    
    // Initialize session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Clear expired sessions every 24 hours
    });

    this.initializeSampleData();
  }

  // Initialize with some sample data for development
  private initializeSampleData() {
    // Create sample user
    const user: User = {
      id: this.currentUserId,
      username: "ptmalindo",
      password: "hashed_password",
      companyName: "PT Malindo",
      email: "contact@ptmalindo.com",
      exportReadiness: 65,
    };
    this.users.set(user.id, user);

    // Create sample export project
    const project: ExportProject = {
      id: this.currentProjectId,
      userId: user.id,
      name: "Handcrafted Furniture to Japan",
      productCategory: "Handcrafted Furniture",
      targetMarket: "Japan",
      status: "in_progress",
      progress: 60,
      currentStage: "Compliance & Documentation",
      createdAt: new Date(),
    };
    this.exportProjects.set(project.id, project);

    // Create sample project stages
    const stages: ProjectStage[] = [
      {
        id: this.currentStageId++,
        projectId: project.id,
        name: "Product Selection",
        status: "completed",
        order: 1,
        description: "You have selected handcrafted teak furniture for export.",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
      },
      {
        id: this.currentStageId++,
        projectId: project.id,
        name: "Market Research",
        status: "completed",
        order: 2,
        description: "You've identified Japan as your target market with positive demand indicators.",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks from now
      },
      {
        id: this.currentStageId++,
        projectId: project.id,
        name: "Compliance & Documentation",
        status: "in_progress",
        order: 3,
        description: "2 out of 5 required documents have been prepared.",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21), // 3 weeks from now
      },
      {
        id: this.currentStageId++,
        projectId: project.id,
        name: "Buyer Matchmaking",
        status: "upcoming",
        order: 4,
        description: "This step will be unlocked after documentation is complete.",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28), // 4 weeks from now
      },
      {
        id: this.currentStageId++,
        projectId: project.id,
        name: "Logistics Planning",
        status: "upcoming",
        order: 5,
        description: "Schedule and manage shipment to Japan.",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35), // 5 weeks from now
      },
      {
        id: this.currentStageId++,
        projectId: project.id,
        name: "Payment Processing",
        status: "upcoming",
        order: 6,
        description: "Secure payment methods and transaction processing.",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 42), // 6 weeks from now
      },
    ];
    
    stages.forEach(stage => {
      this.projectStages.set(stage.id, stage);
    });

    // Create sample documents
    const documentsList: Document[] = [
      {
        id: this.currentDocumentId++,
        projectId: project.id,
        name: "Commercial Invoice",
        type: "invoice",
        status: "completed",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
        content: "Sample commercial invoice content",
      },
      {
        id: this.currentDocumentId++,
        projectId: project.id,
        name: "Packing List",
        type: "packing",
        status: "completed",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
        content: "Sample packing list content",
      },
      {
        id: this.currentDocumentId++,
        projectId: project.id,
        name: "Certificate of Origin",
        type: "certificate",
        status: "in_progress",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), // 8 days from now
        content: "Certificate of origin in progress content",
      },
      {
        id: this.currentDocumentId++,
        projectId: project.id,
        name: "Shipping Bill",
        type: "shipping",
        status: "not_started",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
      },
      {
        id: this.currentDocumentId++,
        projectId: project.id,
        name: "Bill of Lading",
        type: "shipping",
        status: "not_started",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days from now
      },
    ];
    
    documentsList.forEach(doc => {
      this.documents.set(doc.id, doc);
    });

    // Create sample activities
    const activitiesList: Activity[] = [
      {
        id: this.currentActivityId++,
        userId: user.id,
        projectId: project.id,
        type: "document",
        description: "Commercial Invoice document has been approved",
        createdAt: new Date(),
      },
      {
        id: this.currentActivityId++,
        userId: user.id,
        projectId: project.id,
        type: "completion",
        description: "Market research phase completed for Japan",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: this.currentActivityId++,
        userId: user.id,
        projectId: project.id,
        type: "warning",
        description: "Shipping delay detected at Tokyo port",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: this.currentActivityId++,
        userId: user.id,
        projectId: project.id,
        type: "buyer",
        description: "New buyer inquiry received for teak furniture",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      },
      {
        id: this.currentActivityId++,
        userId: user.id,
        projectId: project.id,
        type: "deadline",
        description: "Compliance deadline approaching for Certificate of Origin",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      },
    ];
    
    activitiesList.forEach(activity => {
      this.activities.set(activity.id, activity);
    });

    // Create sample market data
    const marketDataList: MarketData[] = [
      {
        id: this.currentMarketDataId++,
        productCategory: "Handcrafted Furniture",
        country: "Japan",
        importGrowth: 12,
        marketPremium: 25,
        competitorPresence: "Medium",
        localDemandTrend: "Increasing",
        lastUpdated: new Date(),
      },
      {
        id: this.currentMarketDataId++,
        productCategory: "Handcrafted Furniture",
        country: "United States",
        importGrowth: 8,
        marketPremium: 15,
        competitorPresence: "High",
        localDemandTrend: "Stable",
        lastUpdated: new Date(),
      },
      {
        id: this.currentMarketDataId++,
        productCategory: "Handcrafted Furniture",
        country: "Singapore",
        importGrowth: 15,
        marketPremium: 20,
        competitorPresence: "Low",
        localDemandTrend: "Increasing",
        lastUpdated: new Date(),
      },
    ];
    
    marketDataList.forEach(data => {
      this.marketDataEntries.set(data.id, data);
    });

    // Create sample risk assessment
    const riskAssessment: RiskAssessment = {
      id: this.currentRiskAssessmentId,
      projectId: project.id,
      overallScore: 64,
      shippingDelayRisk: 85,
      paymentSecurityRisk: 25,
      regulatoryComplianceRisk: 55,
      currencyFluctuationRisk: 60,
      mitigationSuggestions: [
        { title: "Consider alternate shipping routes", description: "Use air freight for initial samples to avoid port delays" },
        { title: "Expedite remaining documentation", description: "Complete Certificate of Origin by end of week" },
        { title: "Hedge against currency fluctuations", description: "Lock in forward contracts for upcoming transactions" },
      ],
      createdAt: new Date(),
    };
    this.riskAssessments.set(riskAssessment.id, riskAssessment);

    // Create sample recommended products
    const recommendedProductsList: RecommendedProduct[] = [
      {
        id: this.currentRecommendedProductId++,
        productCategory: "Handcrafted Furniture",
        name: "Teak Dining Set",
        description: "High demand in Japanese market",
        targetMarket: "Japan",
        matchScore: 95,
        imageUrl: "",
      },
      {
        id: this.currentRecommendedProductId++,
        productCategory: "Handcrafted Furniture",
        name: "Rattan Accent Chairs",
        description: "Growing trend in Asian markets",
        targetMarket: "Japan",
        matchScore: 87,
        imageUrl: "",
      },
      {
        id: this.currentRecommendedProductId++,
        productCategory: "Handcrafted Furniture",
        name: "Bamboo Shelving Units",
        description: "Eco-friendly appeal to Japanese buyers",
        targetMarket: "Japan",
        matchScore: 76,
        imageUrl: "",
      },
    ];
    
    recommendedProductsList.forEach(product => {
      this.recommendedProductsEntries.set(product.id, product);
    });

    // Initialize document templates
    this.documentTemplates = [
      {
        id: 1,
        name: "Commercial Invoice",
        description: "Details of goods being shipped and their monetary value",
        category: "Shipping",
        complexity: "Low",
      },
      {
        id: 2,
        name: "Packing List",
        description: "Itemized list of package contents with quantities and weights",
        category: "Shipping",
        complexity: "Low",
      },
      {
        id: 3,
        name: "Certificate of Origin",
        description: "Document certifying the country of origin for the exported goods",
        category: "Compliance",
        complexity: "Medium",
      },
      {
        id: 4,
        name: "Phytosanitary Certificate",
        description: "Certificate for plant products confirming they meet health standards",
        category: "Compliance",
        complexity: "High",
      },
      {
        id: 5,
        name: "Bill of Lading",
        description: "Receipt of freight services and title document to the shipped goods",
        category: "Shipping",
        complexity: "Medium",
      },
      {
        id: 6,
        name: "Customs Declaration Form",
        description: "Form declaring goods to customs authorities for clearance",
        category: "Customs",
        complexity: "Medium",
      },
      {
        id: 7,
        name: "Letter of Credit",
        description: "Financial document guaranteeing payment for exported goods",
        category: "Finance",
        complexity: "High",
      },
      {
        id: 8,
        name: "Insurance Certificate",
        description: "Proof of insurance coverage for shipped goods",
        category: "Insurance",
        complexity: "Medium",
      },
    ];
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project operations
  async getProject(id: number): Promise<ExportProject | undefined> {
    return this.exportProjects.get(id);
  }

  async getProjectsByUserId(userId: number): Promise<ExportProject[]> {
    return Array.from(this.exportProjects.values()).filter(
      (project) => project.userId === userId,
    );
  }

  async getCurrentProject(userId: number): Promise<ExportProject | undefined> {
    return Array.from(this.exportProjects.values()).find(
      (project) => project.userId === userId && project.status === "in_progress",
    );
  }

  async createProject(project: InsertExportProject): Promise<ExportProject> {
    const id = this.currentProjectId++;
    const newProject: ExportProject = { 
      ...project, 
      id, 
      createdAt: new Date() 
    };
    this.exportProjects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, updates: Partial<ExportProject>): Promise<ExportProject> {
    const project = this.exportProjects.get(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found.`);
    }
    
    const updatedProject = { ...project, ...updates };
    this.exportProjects.set(id, updatedProject);
    return updatedProject;
  }

  // Project stages operations
  async getProjectStages(projectId: number): Promise<ProjectStage[]> {
    return Array.from(this.projectStages.values())
      .filter((stage) => stage.projectId === projectId)
      .sort((a, b) => a.order - b.order);
  }

  async getProjectStage(id: number): Promise<ProjectStage | undefined> {
    return this.projectStages.get(id);
  }

  async createProjectStage(stage: InsertProjectStage): Promise<ProjectStage> {
    const id = this.currentStageId++;
    const newStage: ProjectStage = { ...stage, id };
    this.projectStages.set(id, newStage);
    return newStage;
  }

  async updateProjectStage(id: number, updates: Partial<ProjectStage>): Promise<ProjectStage> {
    const stage = this.projectStages.get(id);
    if (!stage) {
      throw new Error(`Project stage with ID ${id} not found.`);
    }
    
    const updatedStage = { ...stage, ...updates };
    this.projectStages.set(id, updatedStage);
    return updatedStage;
  }

  // Document operations
  async getDocuments(projectId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      (doc) => doc.projectId === projectId,
    );
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async createDocument(document: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const newDocument: Document = { ...document, id };
    this.documents.set(id, newDocument);
    return newDocument;
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document> {
    const document = this.documents.get(id);
    if (!document) {
      throw new Error(`Document with ID ${id} not found.`);
    }
    
    const updatedDocument = { ...document, ...updates };
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }

  async getDocumentTemplates(): Promise<any[]> {
    return this.documentTemplates;
  }

  // Activity operations
  async getActivitiesByUserId(userId: number, limit: number = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter((activity) => activity.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getActivitiesByProjectId(projectId: number, limit: number = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter((activity) => activity.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const newActivity: Activity = { 
      ...activity, 
      id, 
      createdAt: new Date() 
    };
    this.activities.set(id, newActivity);
    return newActivity;
  }

  // Market data operations
  async getMarketData(productCategory: string, country?: string): Promise<MarketData[]> {
    let marketDataList = Array.from(this.marketDataEntries.values()).filter(
      (data) => data.productCategory === productCategory,
    );
    
    if (country) {
      marketDataList = marketDataList.filter(
        (data) => data.country === country,
      );
    }
    
    return marketDataList;
  }

  // Risk assessment operations
  async getRiskAssessment(projectId: number): Promise<RiskAssessment | undefined> {
    return Array.from(this.riskAssessments.values()).find(
      (assessment) => assessment.projectId === projectId,
    );
  }

  async createRiskAssessment(assessment: InsertRiskAssessment): Promise<RiskAssessment> {
    const id = this.currentRiskAssessmentId++;
    const newAssessment: RiskAssessment = { 
      ...assessment, 
      id, 
      createdAt: new Date() 
    };
    this.riskAssessments.set(id, newAssessment);
    return newAssessment;
  }

  async updateRiskAssessment(id: number, updates: Partial<RiskAssessment>): Promise<RiskAssessment> {
    const assessment = this.riskAssessments.get(id);
    if (!assessment) {
      throw new Error(`Risk assessment with ID ${id} not found.`);
    }
    
    const updatedAssessment = { ...assessment, ...updates };
    this.riskAssessments.set(id, updatedAssessment);
    return updatedAssessment;
  }

  // Recommended products operations
  async getRecommendedProducts(productCategory: string, targetMarket: string): Promise<RecommendedProduct[]> {
    return Array.from(this.recommendedProductsEntries.values()).filter(
      (product) => 
        product.productCategory === productCategory && 
        product.targetMarket === targetMarket,
    );
  }
}

export const storage = new MemStorage();
