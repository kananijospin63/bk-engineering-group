const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    const limit  = Math.min(parseInt(req.query.limit)  || 20, 100);
    const offset = parseInt(req.query.offset) || 0;

    const params = [];
    let idx = 1;
    let where = '';

    if (category) { where += ` AND category = $${idx++}`; params.push(category); }
    if (status)   { where += ` AND status = $${idx++}`;   params.push(status); }

    // LIMIT and OFFSET ajoutés après les filtres
    const limitIdx  = idx++;
    const offsetIdx = idx;
    params.push(limit, offset);

    const { rows } = await pool.query(
      `SELECT * FROM projects WHERE 1=1${where} ORDER BY created_at DESC LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
      params
    );

    // Count total (requête séparée, sans LIMIT/OFFSET)
    const countParams = [];
    let cidx = 1;
    let countWhere = '';
    if (category) { countWhere += ` AND category = $${cidx++}`; countParams.push(category); }
    if (status)   { countWhere += ` AND status = $${cidx++}`;   countParams.push(status); }

    const { rows: countRows } = await pool.query(
      `SELECT COUNT(*) AS total FROM projects WHERE 1=1${countWhere}`,
      countParams
    );

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.json({
      data:   rows,
      total:  parseInt(countRows[0].total),
      limit,
      offset,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/projects/categories
router.get('/categories', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT DISTINCT category FROM projects ORDER BY category'
    );
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.json(rows.map(r => r.category));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
