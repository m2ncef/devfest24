const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const fs = require('fs/promises');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function generateBusinessTips(businessInfo, successRate) {
  try {
    // Load and parse response.json for technology context
    const techData = JSON.parse(await fs.readFile('response.json', 'utf8'));

    const trends = techData.data.things_to_know.buttons
      .map((b) => `${b.text}: ${b.snippet || b.title}`)
      .join('\n');

    const topTechnologies =
      techData.data.related_questions.find((q) => q.question.includes('top 10'))?.list || [];

    const prompt = `
        Analyze this business and its success prediction:
        ${JSON.stringify(businessInfo, null, 2)}
        Current Success Rate: ${successRate}

        Using current technology trends:
        ${trends}

        Top Technologies:
        ${topTechnologies.join('\n')}

        Provide improvement recommendations in the following exact JSON structure:
        {
          "success_analysis": {
            "current_standing": "",
            "key_strengths": [],
            "improvement_areas": []
          },
          "recommended_solutions": {
            "immediate_actions": {
              "internal_improvements": [],
              "technology_adoption": [],
              "our_services": []
            },
            "long_term_strategy": {
              "business_evolution": [],
              "technology_integration": [],
              "partnership_opportunities": []
            }
          },
          "success_rate_improvement": {
            "potential_increase": "",
            "key_factors": [],
            "timeline": ""
          },
          "custom_recommendations": {
            "based_on_category": [],
            "based_on_funding": [],
            "based_on_timeline": []
          }
        }

        Important notes:
        1. Include specific, actionable recommendations
        2. Under "our_services", suggest relevant technology solutions that could help improve their success rate
        3. Provide realistic success rate improvement potential
        4. Ensure recommendations align with their business category and funding level
        5. Fill each array with 2-3 specific, detailed items
        6. Ensure the response is valid JSON format`;

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
  datestart: '2023-01-01',
  montestart: 1000000,
  monthend: 2000000,
};

const successRate = 0.65; // 65% success rate

console.log('Generating improvement tips...');
const tips = await generateBusinessTips(businessInfo, successRate);
console.log(tips);
