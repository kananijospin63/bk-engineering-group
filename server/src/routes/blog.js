const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

// GET /api/blog
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const limit  = Math.min(parseInt(req.query.limit)  || 10, 100);
    const offset = parseInt(req.query.offset) || 0;

    const params = [];
    let idx = 1;
    let where = '';

    if (category) { where += ` AND category = $${idx++}`; params.push(category); }

    const limitIdx  = idx++;
    const offsetIdx = idx;
    params.push(limit, offset);

    const { rows } = await pool.query(
      `SELECT id, title, slug, excerpt, category, thumbnail, author, published_at, created_at
       FROM blog_posts WHERE published = TRUE${where}
       ORDER BY published_at DESC LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
      params
    );

    const countParams = [];
    let cidx = 1;
    let countWhere = '';
    if (category) { countWhere += ` AND category = $${cidx++}`; countParams.push(category); }

    const { rows: countRows } = await pool.query(
      `SELECT COUNT(*) AS total FROM blog_posts WHERE published = TRUE${countWhere}`,
      countParams
    );

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.json({
      data:  rows,
      total: parseInt(countRows[0].total),
      limit,
      offset,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/blog/categories
router.get('/categories', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT DISTINCT category FROM blog_posts WHERE published = TRUE AND category IS NOT NULL ORDER BY category'
    );
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.json(rows.map(r => r.category));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/blog/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND published = TRUE',
      [req.params.slug]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
