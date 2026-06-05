require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const serviceRoutes = require('./routes/services');
const blogRoutes = require('./routes/blog');
const teamRoutes = require('./routes/team');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Compression gzip/brotli des réponses API
app.use(compression());

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // autorise les images depuis le frontend
}));
// Logs HTTP uniquement en développement
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('combined'));
}

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Fichiers uploadés localement (fallback si Cloudinary non configuré)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Stricter rate limit for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later.' },
});
app.use('/api/auth/', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BK Engineering API running on port ${PORT}`);
});

module.exports = app;
