const express = require('express');
const pool = require('../db/connection');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(authenticate, requireAdmin);

// Helper : extrait l'URL d'image depuis le body JSON (Uploadthing)
// ou depuis req.file (upload local legacy)
const getImageUrl = (req, field = 'image') => {
  return req.body[field] || (req.file ? req.file.path : null);
};

// ─── PROJECTS ────────────────────────────────────────────────────────────────

router.get('/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const { title, description, category, location, year, client, status, featured_image } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }
    const { rows } = await pool.query(
      `INSERT INTO projects (title, description, category, location, year, client, status, featured_image)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, category, location, year || null, client, status || 'completed', featured_image || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const { title, description, category, location, year, client, status, featured_image } = req.body;
    const { rows: existing } = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Project not found' });

    const image = featured_image !== undefined ? featured_image : existing[0].featured_image;

    const { rows } = await pool.query(
      `UPDATE projects SET title=$1, description=$2, category=$3, location=$4, year=$5, client=$6,
       status=$7, featured_image=$8, updated_at=NOW()
       WHERE id=$9 RETURNING *`,
      [title, description, category, location, year || null, client, status, image, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── SERVICES ────────────────────────────────────────────────────────────────

router.get('/services', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM services ORDER BY order_index ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const { title, description, short_description, icon, order_index, image } = req.body;
    const { rows: existing } = await pool.query('SELECT * FROM services WHERE id = $1', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Service not found' });

    const img = image !== undefined ? image : existing[0].image;

    const { rows } = await pool.query(
      `UPDATE services SET title=$1, description=$2, short_description=$3, icon=$4,
       order_index=$5, image=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [title, description, short_description, icon, order_index || 0, img, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── TEAM ─────────────────────────────────────────────────────────────────────

router.get('/team', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_members ORDER BY order_index ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/team', async (req, res) => {
  try {
    const { name, role, bio, email, linkedin, order_index, photo } = req.body;
    if (!name || !role) return res.status(400).json({ error: 'Name and role are required' });
    const { rows } = await pool.query(
      `INSERT INTO team_members (name, role, bio, email, linkedin, photo, order_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, role, bio, email, linkedin, photo || null, order_index || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/team/:id', async (req, res) => {
  try {
    const { name, role, bio, email, linkedin, order_index, photo } = req.body;
    const { rows: existing } = await pool.query('SELECT * FROM team_members WHERE id = $1', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Team member not found' });

    const img = photo !== undefined ? photo : existing[0].photo;

    const { rows } = await pool.query(
      `UPDATE team_members SET name=$1, role=$2, bio=$3, email=$4, linkedin=$5,
       photo=$6, order_index=$7, updated_at=NOW()
       WHERE id=$8 RETURNING *`,
      [name, role, bio, email, linkedin, img, order_index || 0, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/team/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_members WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Team member not found' });
    await pool.query('DELETE FROM team_members WHERE id = $1', [req.params.id]);
    res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── BLOG ─────────────────────────────────────────────────────────────────────

router.get('/blog', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/blog', async (req, res) => {
  try {
    const { title, content, excerpt, category, author, published, thumbnail } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

    const baseSlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 8)}`;
    const isPublished = published === 'true' || published === true;

    const { rows } = await pool.query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, category, author, thumbnail, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, slug, content, excerpt, category, author || 'BK Engineering', thumbnail || null, isPublished, isPublished ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/blog/:id', async (req, res) => {
  try {
    const { title, content, excerpt, category, author, published, thumbnail } = req.body;
    const { rows: existing } = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Post not found' });

    const img = thumbnail !== undefined ? thumbnail : existing[0].thumbnail;
    const isPublished = published === 'true' || published === true;
    const published_at = isPublished && !existing[0].published_at ? new Date() : existing[0].published_at;

    const { rows } = await pool.query(
      `UPDATE blog_posts SET title=$1, content=$2, excerpt=$3, category=$4, author=$5,
       thumbnail=$6, published=$7, published_at=$8, updated_at=NOW()
       WHERE id=$9 RETURNING *`,
      [title, content, excerpt, category, author, img, isPublished, published_at, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/blog/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── MESSAGES ─────────────────────────────────────────────────────────────────

router.get('/messages', async (req, res) => {
  try {
    const { read_status } = req.query;
    let query  = 'SELECT * FROM contact_messages';
    const params = [];
    if (read_status !== undefined) {
      query += ' WHERE read_status = $1';
      params.push(read_status === 'true');
    }
    query += ' ORDER BY received_at DESC';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    await pool.query('UPDATE contact_messages SET read_status = TRUE WHERE id = $1', [req.params.id]);
    res.json({ message: 'Message marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_messages WHERE id = $1', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── STATS ────────────────────────────────────────────────────────────────────

router.get('/stats', async (req, res) => {
  try {
    const [projects, services, team, posts, messages, unread] = await Promise.all([
      pool.query('SELECT COUNT(*) AS count FROM projects'),
      pool.query('SELECT COUNT(*) AS count FROM services'),
      pool.query('SELECT COUNT(*) AS count FROM team_members'),
      pool.query('SELECT COUNT(*) AS count FROM blog_posts'),
      pool.query('SELECT COUNT(*) AS count FROM contact_messages'),
      pool.query('SELECT COUNT(*) AS count FROM contact_messages WHERE read_status = FALSE'),
    ]);
    res.json({
      projects:       parseInt(projects.rows[0].count),
      services:       parseInt(services.rows[0].count),
      team:           parseInt(team.rows[0].count),
      posts:          parseInt(posts.rows[0].count),
      messages:       parseInt(messages.rows[0].count),
      unreadMessages: parseInt(unread.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
