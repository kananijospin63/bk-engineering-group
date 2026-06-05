const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

// GET /api/team — données quasi-statiques, cache 1h
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, role, bio, photo, email, linkedin, order_index FROM team_members ORDER BY order_index ASC'
    );
    res.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
