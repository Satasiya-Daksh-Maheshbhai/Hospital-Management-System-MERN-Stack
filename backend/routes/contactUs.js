const express = require('express');
const router = express.Router();
const ContactUs = require('../models/ContactUs');
const User = require('../models/User');

// Create a contact-us entry (requires a valid patient userId)
router.post('/', async (req, res) => {
  try {
    const { userId, name, email, subject, message } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== 'patient') {
      return res.status(403).json({ message: 'Only logged-in patients can submit the contact form' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const entry = await ContactUs.create({ user: user._id, name, email, subject, message });
    return res.status(201).json({ success: true, entry });
  } catch (error) {
    console.error('ContactUs POST error:', error);
    return res.status(500).json({ message: error.message });
  }
});

// Optional: admin can list contact messages
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const items = await ContactUs.find().sort({ createdAt: -1 });
    return res.json({ success: true, items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;


