const express = require('express');
const axios = require('axios');
const router = express.Router();
const newsApi = require('../utils/newsApi');

router.get('/', async (req, res) => {
  const userId = req.user.id;
  const preferences = userPreferences.find((pref) => pref.userId === userId);

  if (!preferences) {
    return res.status(404).json({ message: 'Preferences not found' });
  }

  const newsArticles = await newsApi.fetchNews(preferences.preferences);

  res.json(newsArticles);
});

module.exports = router;
