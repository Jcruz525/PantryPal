const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const router = express.Router();
console.log('API Key:', process.env.REACT_APP_API_KEY);
const users = [];

router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      users.push({ email, password: hashedPassword, nickname: '', profileImg: '' });
      res.status(201).send('User registered successfully');
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({
      token,
      user: {
        email: user.email,
        nickname: user.nickname,
        profileImg: user.profileImg,
      },
    });
  }
);

router.get('/profile', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = users.find((user) => user.email === decoded.email);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    res.json({ email: user.email, nickname: user.nickname, profileImg: user.profileImg });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

router.put('/profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  const { nickname, profileImg } = req.body;

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = users.find((user) => user.email === decoded.email);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (nickname) user.nickname = nickname;
    if (profileImg) user.profileImg = profileImg;

    res.status(200).json({
      msg: 'Profile updated successfully',
      user: { email: user.email, nickname: user.nickname, profileImg: user.profileImg },
    });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

router.get('/users', (req, res) => {
  res.json(users);
});

module.exports = router;
