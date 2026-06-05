const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db/connection');
const { sendContactNotification, sendContactAutoReply } = require('../utils/email');

const router = express.Router();

// POST /api/contact
router.post(
  '/',
  [
    body('name').trim().notEmpty().isLength({ max: 150 }),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().notEmpty().isLength({ max: 300 }),
    body('message').trim().notEmpty().isLength({ min: 10, max: 5000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
      await pool.query(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
        [name, email, subject, message]
      );

      // Send email notifications (non-blocking)
      Promise.all([
        sendContactNotification({ name, email, subject, message }),
        sendContactAutoReply({ name, email, subject }),
      ]).catch(err => console.error('Email notification error:', err.message));

      res.status(201).json({ message: 'Message envoyé avec succès. Nous vous répondrons bientôt !' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
  }
);

module.exports = router;
