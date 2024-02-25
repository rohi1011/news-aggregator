const axios = require('axios');
require('dotenv').config();

async function fetchNews(preferences) {

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: process.env.API_KEY, 
        country: 'india',
        category: preferences.category,
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Error fetching news');
  }
}

module.exports = { fetchNews };
