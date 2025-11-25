
import { GoogleGenAI } from "@google/genai";
import { type Order, type ChartData } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for development. In a real environment, the key is expected to be set.
  // We'll proceed with a mock setup if the key is not found, to allow UI development.
  console.warn("API_KEY environment variable not set. Using mock service.");
}

const generateSummaryWithGemini = async (orders: Order[], chartData: ChartData[]): Promise<string> => {
  if (!process.env.API_KEY) {
    // Mock response for UI development without an API key
    return new Promise(resolve => setTimeout(() => resolve(`**Monthly Business Performance Analysis**

*   **Revenue Growth:** The company shows a positive revenue trend, peaking at $4,890 in June.
*   **Recent Orders:** Key recent orders include a high-value transaction of $2,890.50 marked as 'Completed'.
*   **Strategic Recommendation:** Focus on converting 'Pending' orders and analyze factors behind 'Cancelled' ones to optimize sales.`), 1500));
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const chartDataSummary = chartData.map(d => `${d.name}: $${d.revenue}`).join(', ');
  const ordersSummary = orders.slice(0, 5).map(o => `Order ${o.id} for ${o.customer} at $${o.amount} is ${o.status}`).join('\n');

  const prompt = `
    You are a business analyst AI. Based on the following data, provide a concise, insightful summary of the business performance in markdown format. 
    Focus on key trends, notable orders, and provide one strategic recommendation.

    **Monthly Revenue Data:**
    ${chartDataSummary}

    **Recent Orders Data:**
    ${ordersSummary}

    Generate a summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while generating the summary. Please check the console for details.";
  }
};

export default generateSummaryWithGemini;
