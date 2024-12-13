const axios = require('axios');

const fetchGoogleTrends = async (req, res) => {
  const { keyword, category, location, time } = req.query;

  try {
    const apiUrl = `https://serpapi.com/search?engine=google_trends&api_key=${process.env.SERPAPI_KEY}`;

    const params = {
      keyword: keyword || 'Technology',
      category: category || '',
      location: location || '',
      time: time || 'now 7-d',
    };

    const response = await axios.get(apiUrl, { params });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Google Trends:', error.message);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
};

module.exports = { fetchGoogleTrends };
