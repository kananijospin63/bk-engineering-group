/**
 * Storage — Supabase Storage (production) ou disque local (dev)
 *
 * En production : les images sont stockées dans un bucket Supabase
 * En dev        : les images sont stockées dans server/public/uploads/
 */

const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

// ─── Détection de l'environnement ────────────────────────────────────────────
const useSupabase =
  process.env.SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_KEY &&
  process.env.SUPABASE_URL !== 'your_supabase_url';

let supabase = null;
if (useSupabase) {
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY  // service_role key (pas anon)
  );
  console.log('✅ Supabase Storage configuré');
} else {
  console.log('ℹ️  Supabase non configuré — stockage local activé (public/uploads/)');
}

// ─── Stockage local (dev) ────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer mémoire (pour Supabase) ou disque (pour local)
const memoryStorage = multer.memoryStorage();
const diskStorage   = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, unique + path.extname(file.originalname));
  },
});

// ─── Upload vers Supabase ─────────────────────────────────────────────────────
async function uploadToSupabase(file, folder) {
  const ext      = path.extname(file.originalname);
  const filename = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
  const bucket   = process.env.SUPABASE_BUCKET || 'bk-engineering';

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw new Error('Supabase upload error: ' + error.message);

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename);

  return { url: publicUrl, publicId: filename };
}

// ─── Suppression d'image ──────────────────────────────────────────────────────
async function deleteImage(publicId) {
  if (!publicId) return;
  try {
    if (useSupabase && !publicId.startsWith('local/')) {
      const bucket = process.env.SUPABASE_BUCKET || 'bk-engineering';
      await supabase.storage.from(bucket).remove([publicId]);
    } else {
      // Suppression locale
      const filename = publicId.replace('local/', '');
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error('Image delete error:', err.message);
  }
}

// ─── Middleware upload avec gestion d'erreur ──────────────────────────────────
function createUploader(folder, sizeMB = 5) {
  const storage = useSupabase ? memoryStorage : diskStorage;
  const upload  = multer({
    storage,
    limits: { fileSize: sizeMB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = /jpeg|jpg|png|webp|gif/;
      if (allowed.test(path.extname(file.originalname).toLowerCase())) {
        cb(null, true);
      } else {
        cb(new Error('Format non supporté. Utilisez JPG, PNG ou WebP.'));
      }
    },
  });

  return {
    // Middleware Express qui gère l'upload (local ou Supabase)
    single: (fieldName) => async (req, res, next) => {
      upload.single(fieldName)(req, res, async (err) => {
        if (err) {
          console.error('Upload error:', err.message);
          req.file = null;
          return next(); // continue sans fichier
        }

        if (req.file && useSupabase) {
          try {
            const { url, publicId } = await uploadToSupabase(req.file, folder);
            req.file.path     = url;
            req.file.filename = publicId;
          } catch (e) {
            console.error('Supabase upload failed:', e.message);
            req.file = null;
          }
        } else if (req.file && !useSupabase) {
          // Local — construire l'URL proxy
          const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
          req.file.path     = `${clientUrl}/api-uploads/${req.file.filename}`;
          req.file.filename = `local/${req.file.filename}`;
        }

        next();
      });
    },
  };
}

// ─── Exportation des uploaders par type ──────────────────────────────────────
const uploadProject = createUploader('projects', 5);
const uploadService = createUploader('services', 5);
const uploadTeam    = createUploader('team',     3);
const uploadBlog    = createUploader('blog',     5);

module.exports = {
  uploadProject,
  uploadService,
  uploadTeam,
  uploadBlog,
  deleteImage,
  useSupabase,
};
