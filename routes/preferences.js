const express = require('express');
const router = express.Router();

// In-memory data store for preferences
const userPreferences = [];

router.get('/', (req, res) => {
  const userId = req.user.id;
  const preferences = userPreferences.find((pref) => pref.userId === userId);

  if (!preferences) {
    return res.status(404).json({ message: 'Preferences not found' });
  }

  res.json(preferences);
});

router.put('/', (req, res) => {
  const userId = req.user.id;
  const { preferences } = req.body;

  // Validation

  const index = userPreferences.findIndex((pref) => pref.userId === userId);

  if (index === -1) {
    userPreferences.push({ userId, preferences });
  } else {
    userPreferences[index].preferences = preferences;
  }

  res.json({ message: 'Preferences updated successfully' });
});

module.exports = router;
