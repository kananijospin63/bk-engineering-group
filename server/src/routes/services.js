const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

// GET /api/services — données quasi-statiques, cache 1h
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM services ORDER BY order_index ASC');
    res.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/services/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM services WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
