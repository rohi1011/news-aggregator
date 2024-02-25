const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // In-memory data store

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validation

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = { username, password: hashedPassword };
  users.push(user);

  res.json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validation

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ user: { id: user.id } }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
