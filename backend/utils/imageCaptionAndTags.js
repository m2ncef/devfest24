const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = process.env;
const fs = require('fs/promises');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// Helper function to convert image file to GenerativePart
async function fileToGenerativePart(path, mimeType) {
  const data = await fs.readFile(path);
  return {
    inlineData: {
      data: Buffer.from(data).toString('base64'),
      mimeType,
    },
  };
}

async function generateImageContent(imagePath) {
  try {
    // Load tech trends for relevant hashtags
    const techData = JSON.parse(await fs.readFile('response.json', 'utf8'));
    const trends = techData.data.things_to_know.buttons.map((b) => b.text).join(', ');

    // Convert image to proper format
    const imagePart = await fileToGenerativePart(imagePath, 'image/jpeg');

    const prompt = `
        Analyze this image and provide the following in JSON format:
        {
            "caption": "A detailed caption describing the image",
            "instagram_post": {
                "title": "An attention-grabbing, creative title for Instagram",
                "description": "An engaging description that would work well on Instagram (2-3 sentences)",
                "hashtags": ["4-5 relevant hashtags, incorporating current tech trends where appropriate"]
            },
            "tech_relevance": "Brief note on how this relates to current technology trends if applicable"
        }

        Current tech trends for context: ${trends}

        Make the content engaging and social-media friendly while maintaining professionalism.
        Ensure hashtags are relevant and trending.`;

    const result = await model.generateContent([imagePart, prompt]);
    return result.response.text();
  } catch (error) {
    console.error('Error:', error);
    return JSON.stringify({
      error: error.message,
      details: 'Failed to process image or generate content',
    });
  }
}

// Example usage
async function main() {
  const imagePath = 'image/testimg8.jpg';
  console.log('Generating content for image...');
  const content = await generateImageContent(imagePath);
  console.log(content);
}

main();
