import { InsertUser, User, InsertExportProject, ExportProject, ProjectStage, Document, Activity, MarketData, RiskAssessment, RecommendedProduct } from "@shared/schema";
import { db } from "./db";
import { users, exportProjects, projectStages, documents, activities, marketData, riskAssessments, recommendedProducts } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { SessionStore } from "express-session";
import createMemoryStore from "memorystore";
import session from "express-session";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  sessionStore: SessionStore;

  constructor() {
    // Initialize session store (still using memory store for sessions for simplicity)
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Clear expired sessions every 24 hours
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Project operations
  async getProject(id: number): Promise<ExportProject | undefined> {
    const [project] = await db.select().from(exportProjects).where(eq(exportProjects.id, id));
    return project || undefined;
  }

  async getProjectsByUserId(userId: number): Promise<ExportProject[]> {
    return await db.select().from(exportProjects).where(eq(exportProjects.userId, userId));
  }

  async getCurrentProject(userId: number): Promise<ExportProject | undefined> {
    // For simplicity, get the most recently created project for the user
    const [project] = await db.select()
      .from(exportProjects)
      .where(eq(exportProjects.userId, userId))
      .orderBy(exportProjects.createdAt)
      .limit(1);
    
    return project || undefined;
  }

  async createProject(project: InsertExportProject): Promise<ExportProject> {
    const [newProject] = await db.insert(exportProjects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, updates: Partial<ExportProject>): Promise<ExportProject> {
    const [updatedProject] = await db.update(exportProjects)
      .set(updates)
      .where(eq(exportProjects.id, id))
      .returning();
    
    return updatedProject;
  }

  // Project stages operations
  async getProjectStages(projectId: number): Promise<ProjectStage[]> {
    return await db.select()
      .from(projectStages)
      .where(eq(projectStages.projectId, projectId))
      .orderBy(projectStages.order);
  }

  async getProjectStage(id: number): Promise<ProjectStage | undefined> {
    const [stage] = await db.select().from(projectStages).where(eq(projectStages.id, id));
    return stage || undefined;
  }

  async createProjectStage(stage: any): Promise<ProjectStage> {
    const [newStage] = await db.insert(projectStages).values(stage).returning();
    return newStage;
  }

  async updateProjectStage(id: number, updates: Partial<ProjectStage>): Promise<ProjectStage> {
    const [updatedStage] = await db.update(projectStages)
      .set(updates)
      .where(eq(projectStages.id, id))
      .returning();
    
    return updatedStage;
  }

  // Document operations
  async getDocuments(projectId: number): Promise<Document[]> {
    return await db.select().from(documents).where(eq(documents.projectId, projectId));
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document || undefined;
  }

  async createDocument(document: any): Promise<Document> {
    const [newDocument] = await db.insert(documents).values(document).returning();
    return newDocument;
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document> {
    const [updatedDocument] = await db.update(documents)
      .set(updates)
      .where(eq(documents.id, id))
      .returning();
    
    return updatedDocument;
  }

  async getDocumentTemplates(): Promise<any[]> {
    // This would be replaced with a real query
    return [
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
      }
    ];
  }

  // Activity operations
  async getActivitiesByUserId(userId: number, limit: number = 10): Promise<Activity[]> {
    return await db.select()
      .from(activities)
      .where(eq(activities.userId, userId))
      .limit(limit)
      .orderBy(activities.createdAt);
  }

  async getActivitiesByProjectId(projectId: number, limit: number = 10): Promise<Activity[]> {
    return await db.select()
      .from(activities)
      .where(eq(activities.projectId, projectId))
      .limit(limit)
      .orderBy(activities.createdAt);
  }

  async createActivity(activity: any): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activity).returning();
    return newActivity;
  }

  // Market data operations
  async getMarketData(productCategory: string, country?: string): Promise<MarketData[]> {
    let query = db.select().from(marketData).where(eq(marketData.productCategory, productCategory));
    
    if (country) {
      query = query.where(eq(marketData.country, country));
    }
    
    return await query;
  }

  // Risk assessment operations
  async getRiskAssessment(projectId: number): Promise<RiskAssessment | undefined> {
    const [assessment] = await db.select()
      .from(riskAssessments)
      .where(eq(riskAssessments.projectId, projectId));
    
    return assessment || undefined;
  }

  async createRiskAssessment(assessment: any): Promise<RiskAssessment> {
    const [newAssessment] = await db.insert(riskAssessments).values(assessment).returning();
    return newAssessment;
  }

  async updateRiskAssessment(id: number, updates: Partial<RiskAssessment>): Promise<RiskAssessment> {
    const [updatedAssessment] = await db.update(riskAssessments)
      .set(updates)
      .where(eq(riskAssessments.id, id))
      .returning();
    
    return updatedAssessment;
  }

  // Recommended products operations
  async getRecommendedProducts(productCategory: string, targetMarket: string): Promise<RecommendedProduct[]> {
    return await db.select()
      .from(recommendedProducts)
      .where(eq(recommendedProducts.productCategory, productCategory))
      .where(eq(recommendedProducts.targetMarket, targetMarket));
  }
}