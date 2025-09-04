const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');

// Create a review (patient only)
router.post('/', async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    if (!userId) return res.status(401).json({ message: 'User ID required' });
    const user = await User.findById(userId);
    if (!user || user.role !== 'patient') {
      return res.status(403).json({ message: 'Only logged-in patients can review' });
    }
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }
    const created = await Review.create({ user: user._id, name: user.name, rating, comment });
    return res.status(201).json({ success: true, review: created });
  } catch (error) {
    console.error('Review POST error:', error);
    return res.status(500).json({ message: error.message });
  }
});

// Get all reviews (public)
router.get('/', async (_req, res) => {
  try {
    const items = await Review.find().sort({ createdAt: -1 });
    return res.json({ success: true, reviews: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

