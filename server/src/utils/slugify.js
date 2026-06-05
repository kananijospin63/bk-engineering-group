/**
 * Generate a URL-friendly slug from a string
 * Handles French characters and accents
 */
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')                        // decompose accented chars
    .replace(/[\u0300-\u036f]/g, '')         // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')           // remove non-alphanumeric
    .replace(/\s+/g, '-')                    // spaces → hyphens
    .replace(/-+/g, '-')                     // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');               // trim leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a timestamp if needed
 */
function uniqueSlug(text) {
  return `${slugify(text)}-${Date.now()}`;
}

module.exports = { slugify, uniqueSlug };
