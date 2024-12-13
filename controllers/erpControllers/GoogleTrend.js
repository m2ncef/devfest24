const axios = require('axios');

const fakeTrendsData = {
  search_results: [
    {
      title: 'AI Revolution',
      search_interest: 95,
      time: '2024-12-12',
    },
    {
      title: 'Blockchain Technology',
      search_interest: 85,
      time: '2024-12-11',
    },
    {
      title: 'Quantum Computing',
      search_interest: 78,
      time: '2024-12-10',
    },
    {
      title: 'Space Exploration',
      search_interest: 67,
      time: '2024-12-09',
    },
  ],
};

const fetchGoogleTrends = async (req, res) => {
  try {
    const apiUrl = 'https://serpapi.com/search?engine=google_trends/';

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      console.warn('External API returned non-200 status. Using fake data.');
      return res.status(200).json(fakeTrendsData);
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from external API:', error.message);

    return res.status(200).json(fakeTrendsData);
  }
};

module.exports = { fetchGoogleTrends };
