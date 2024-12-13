module.exports = {
  chargily: {
    apiKey: process.env.CHARGILY_API_KEY,
    apiSecret: process.env.CHARGILY_API_SECRET,
    webhookUrl: process.env.CHARGILY_WEBHOOK_URL,
    backUrl: process.env.CHARGILY_BACK_URL,
  },
  // ... other config
};
