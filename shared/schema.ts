import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  exportReadiness: integer("export_readiness").default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  companyName: true,
  email: true,
  exportReadiness: true,
});

export const exportProjects = pgTable("export_projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  productCategory: text("product_category").notNull(),
  targetMarket: text("target_market").notNull(),
  status: text("status").notNull().default("in_progress"),
  progress: integer("progress").default(0),
  currentStage: text("current_stage").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExportProjectSchema = createInsertSchema(exportProjects).pick({
  userId: true,
  name: true,
  productCategory: true,
  targetMarket: true,
  status: true,
  progress: true,
  currentStage: true,
});

export const projectStages = pgTable("project_stages", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  name: text("name").notNull(),
  status: text("status").notNull().default("not_started"),
  order: integer("order").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
});

export const insertProjectStageSchema = createInsertSchema(projectStages).pick({
  projectId: true,
  name: true,
  status: true,
  order: true,
  description: true,
  dueDate: true,
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("not_started"),
  dueDate: timestamp("due_date"),
  content: text("content"),
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  projectId: true,
  name: true,
  type: true,
  status: true,
  dueDate: true,
  content: true,
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id"),
  type: text("type").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  userId: true,
  projectId: true,
  type: true,
  description: true,
});

export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  productCategory: text("product_category").notNull(),
  country: text("country").notNull(),
  importGrowth: integer("import_growth"),
  marketPremium: integer("market_premium"),
  competitorPresence: text("competitor_presence"),
  localDemandTrend: text("local_demand_trend"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertMarketDataSchema = createInsertSchema(marketData).pick({
  productCategory: true,
  country: true,
  importGrowth: true,
  marketPremium: true,
  competitorPresence: true,
  localDemandTrend: true,
});

export const riskAssessments = pgTable("risk_assessments", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  overallScore: integer("overall_score").notNull(),
  shippingDelayRisk: integer("shipping_delay_risk"),
  paymentSecurityRisk: integer("payment_security_risk"),
  regulatoryComplianceRisk: integer("regulatory_compliance_risk"),
  currencyFluctuationRisk: integer("currency_fluctuation_risk"),
  mitigationSuggestions: json("mitigation_suggestions").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRiskAssessmentSchema = createInsertSchema(riskAssessments).pick({
  projectId: true,
  overallScore: true,
  shippingDelayRisk: true,
  paymentSecurityRisk: true,
  regulatoryComplianceRisk: true,
  currencyFluctuationRisk: true,
  mitigationSuggestions: true,
});

export const recommendedProducts = pgTable("recommended_products", {
  id: serial("id").primaryKey(),
  productCategory: text("product_category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetMarket: text("target_market").notNull(),
  matchScore: integer("match_score").notNull(),
  imageUrl: text("image_url"),
});

export const insertRecommendedProductSchema = createInsertSchema(recommendedProducts).pick({
  productCategory: true,
  name: true,
  description: true,
  targetMarket: true,
  matchScore: true,
  imageUrl: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ExportProject = typeof exportProjects.$inferSelect;
export type InsertExportProject = z.infer<typeof insertExportProjectSchema>;

export type ProjectStage = typeof projectStages.$inferSelect;
export type InsertProjectStage = z.infer<typeof insertProjectStageSchema>;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type MarketData = typeof marketData.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;

export type RiskAssessment = typeof riskAssessments.$inferSelect;
export type InsertRiskAssessment = z.infer<typeof insertRiskAssessmentSchema>;

export type RecommendedProduct = typeof recommendedProducts.$inferSelect;
export type InsertRecommendedProduct = z.infer<typeof insertRecommendedProductSchema>;
