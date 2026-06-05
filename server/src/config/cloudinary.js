const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Vérifie si Cloudinary est configuré avec de vraies clés
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_KEY !== 'your_api_key';

let cloudinary = null;
let CloudinaryStorage = null;

if (isCloudinaryConfigured) {
  cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  ({ CloudinaryStorage } = require('multer-storage-cloudinary'));
  console.log('✅ Cloudinary configuré');
} else {
  console.log('ℹ️  Cloudinary non configuré — stockage local activé (public/uploads/)');
}

// ─── Stockage local (fallback) ───────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, unique + path.extname(file.originalname));
  },
});

// Transforme le fichier local pour matcher la structure Cloudinary
// req.file.path  = URL complète  (ex: http://localhost:5000/uploads/123.jpg)
// req.file.filename = public_id local
const localAfterUpload = (req, res, next) => {
  if (req.file && !isCloudinaryConfigured) {
    // Utilise le proxy Next.js /api-uploads/ au lieu de http://localhost:5000/uploads/
    // Évite les erreurs "hostname not configured" de next/image
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    req.file.path     = `${clientUrl}/api-uploads/${req.file.filename}`;
    req.file.filename = `local/${req.file.filename}`;
  }
  next();
};

// ─── Factories de multer ──────────────────────────────────────────────────────
const createUploader = (folder, sizeMB = 5) => {
  if (isCloudinaryConfigured) {
    return multer({
      storage: new CloudinaryStorage({
        cloudinary,
        params: {
          folder: `bk-engineering/${folder}`,
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
      }),
      limits: { fileSize: sizeMB * 1024 * 1024 },
    });
  }

  // Stockage local — on retourne un objet qui wrape multer + middleware post-upload
  const upload = multer({ storage: localStorage, limits: { fileSize: sizeMB * 1024 * 1024 } });
  // On enrichit single() pour ajouter le middleware de normalisation
  const originalSingle = upload.single.bind(upload);
  upload.single = (fieldName) => {
    const middleware = originalSingle(fieldName);
    return (req, res, next) => {
      middleware(req, res, (err) => {
        if (err) return next(err);
        localAfterUpload(req, res, next);
      });
    };
  };
  return upload;
};

const uploadProject = createUploader('projects', 5);
const uploadService = createUploader('services', 5);
const uploadTeam    = createUploader('team',     3);
const uploadBlog    = createUploader('blog',     5);

// ─── Suppression d'image ──────────────────────────────────────────────────────
const deleteImage = async (publicId) => {
  if (!publicId) return;
  try {
    if (isCloudinaryConfigured && !publicId.startsWith('local/')) {
      await cloudinary.uploader.destroy(publicId);
    } else {
      // Suppression locale
      const filename = publicId.replace('local/', '');
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error('Image delete error:', err.message);
  }
};

module.exports = {
  cloudinary,
  uploadProject,
  uploadService,
  uploadTeam,
  uploadBlog,
  deleteImage,
  isCloudinaryConfigured,
};
