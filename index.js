const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth.js');
const authRoutes = require('./routes/auth');
const preferencesRoutes = require('./routes/preferences');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/preferences', authMiddleware.authenticateUser, preferencesRoutes);
app.use('/news', authMiddleware.authenticateUser, newsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
