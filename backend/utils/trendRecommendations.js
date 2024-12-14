import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
const { GEMINI_API_KEY } = process.env;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function analyzeBusinessWithTechTrends(businessInfo) {
  try {
    // Load and parse response.json
    const techData = JSON.parse(await fs.readFile('response.json', 'utf8'));

    // Extract relevant information
    const trends = techData.data.things_to_know.buttons
      .map((b) => `${b.text}: ${b.snippet || b.title}`)
      .join('\n');

    const techDefinition = techData.data.answer_box.definitions.join('\n');

    const topTechnologies =
      techData.data.related_questions.find((q) => q.question.includes('top 10'))?.list || [];

    const benefits =
      techData.data.things_to_know.buttons.find((b) => b.text === 'Benefits')?.list || [];

    // Create prompt with context
    const prompt = `
        Analyze this business:
        ${JSON.stringify(businessInfo, null, 2)}

        Using current technology trends and insights:
        
        Definition of Technology:
        ${techDefinition}

        Current Technology Trends:
        ${trends}

        Top Technologies:
        ${topTechnologies.join('\n')}

        Key Benefits:
        ${benefits.join('\n')}

        Provide recommendations in the following exact JSON structure:
        {
          "technology_recommendations": {
            "core_technologies": [],
            "emerging_technologies": [],
            "infrastructure_needs": []
          },
          "implementation_strategy": {
            "immediate_steps": [],
            "long_term_goals": [],
            "resource_requirements": []
          },
          "growth_opportunities": {
            "market_expansion": [],
            "product_development": [],
            "partnership_possibilities": []
          },
          "risk_assessment": {
            "technical_risks": [],
            "market_risks": [],
            "mitigation_strategies": []
          },
          "implementation_timeline": {
            "phase1": {
              "timeline": "0-6 months",
              "tasks": []
            },
            "phase2": {
              "timeline": "6-12 months",
              "tasks": []
            },
            "phase3": {
              "timeline": "12-18 months",
              "tasks": []
            }
          }
        }

        Fill each array with 3-4 relevant items based on the business information and technology trends provided.
        Ensure the response is valid JSON format.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error:', error);
    return JSON.stringify({ error: error.message });
  }
}

// Example usage
const businessInfo = {
  category: 'software',
  startDate: '2023-01-01',
  initialFunding: 1000000,
  currentFunding: 2000000,
};
0;

console.log('Analyzing business with current tech trends...');
const analysis = await analyzeBusinessWithTechTrends(businessInfo);
console.log(analysis);
