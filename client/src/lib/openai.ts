import { apiRequest } from "./queryClient";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const GPT_MODEL = "gpt-4o";

export async function analyzeMarketDemand(productCategory: string, targetMarket: string) {
  try {
    const response = await apiRequest("POST", "/api/ai/market-analysis", {
      productCategory,
      targetMarket,
    });
    return await response.json();
  } catch (error) {
    console.error("Error analyzing market demand:", error);
    throw error;
  }
}

export async function assessExportRisks(projectData: {
  productCategory: string;
  targetMarket: string;
  exportStage: string;
}) {
  try {
    const response = await apiRequest("POST", "/api/ai/risk-assessment", {
      projectData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error assessing export risks:", error);
    throw error;
  }
}

export async function generateDocument(
  documentType: string,
  projectData: {
    productName: string;
    targetMarket: string;
    companyName: string;
  }
) {
  try {
    const response = await apiRequest("POST", "/api/ai/generate-document", {
      documentType,
      projectData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error generating document:", error);
    throw error;
  }
}

export async function getExportProcessGuidance(
  productCategory: string,
  targetMarket: string,
  currentStage: string
) {
  try {
    const response = await apiRequest("POST", "/api/ai/export-guidance", {
      productCategory,
      targetMarket,
      currentStage,
    });
    return await response.json();
  } catch (error) {
    console.error("Error getting export process guidance:", error);
    throw error;
  }
}

export async function getMitigationSuggestions(risks: {
  shippingDelay: number;
  paymentSecurity: number;
  regulatoryCompliance: number;
  currencyFluctuation: number;
}) {
  try {
    const response = await apiRequest("POST", "/api/ai/mitigation-suggestions", {
      risks,
    });
    return await response.json();
  } catch (error) {
    console.error("Error getting mitigation suggestions:", error);
    throw error;
  }
}
