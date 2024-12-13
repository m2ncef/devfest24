const axios = require('axios');

const fetchGoogleTrends = async (req, res) => {
  const { keyword } = req.query;
  try {
    // First request - Search data
    const searchResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        api_key: process.env.SERPAPI_KEY,
        q: keyword || 'Technology',
        engine: 'google',
      },
    });

    // Check if both responses are successful
    if (searchResponse.data) {
      return res.status(200).json({
        success: true,
        data: searchResponse.data,
      });
    } else {
      throw new Error('Invalid response from SerpAPI');
    }
  } catch (error) {
    console.error('Detailed error:', error);

    // More specific error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);

      return res.status(error.response.status).json({
        success: false,
        error: 'API Error',
        details: error.response.data?.error || error.message,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);

      return res.status(503).json({
        success: false,
        error: 'Service Unavailable',
        details: 'No response received from the API',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);

      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        details: error.message,
      });
    }
  }
};

module.exports = { fetchGoogleTrends };
