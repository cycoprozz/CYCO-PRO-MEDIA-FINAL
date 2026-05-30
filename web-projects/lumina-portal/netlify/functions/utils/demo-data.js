const DEMO_GALLERY = {
  code: 'WED-2025-001',
  title: 'Sample Wedding Gallery',
  category: 'Wedding',
  date: '2025-06-15',
  location: 'Napa Valley',
  expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  images: [
    { id: 'demo-img-0', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', title: 'Ceremony', meta: 'Outdoor' },
    { id: 'demo-img-1', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', title: 'Portrait', meta: 'Golden hour' },
    { id: 'demo-img-2', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=85', title: 'Reception', meta: 'Evening' }
  ]
};

const DEMO_ACCESS = { email: 'client@example.com', galleryId: 'WED-2025-001' };

const demoFavorites = new Map();

function isDemo() {
  const secret = process.env.FAUNA_SECRET;
  return !secret || secret === 'your-fauna-db-secret' || secret === 'demo';
}

function getDemoGallery(code) {
  if (code !== DEMO_GALLERY.code) return null;
  return {
    ref: { id: 'demo-gallery' },
    data: DEMO_GALLERY
  };
}

function hasDemoAccess(email, galleryId) {
  return email === DEMO_ACCESS.email && galleryId === DEMO_ACCESS.galleryId;
}

/** Get the gallery ID for an email (email-only login). Returns null if no access. */
function getDemoGalleryIdForEmail(email) {
  const normalized = (email || '').trim().toLowerCase();
  if (normalized === DEMO_ACCESS.email) return DEMO_ACCESS.galleryId;
  return null;
}

function getDemoFavorites(email, galleryId) {
  const key = `${email}:${galleryId}`;
  return demoFavorites.get(key) || [];
}

function setDemoFavorites(email, galleryId, imageIds) {
  const key = `${email}:${galleryId}`;
  demoFavorites.set(key, imageIds);
}

function addDemoFavorite(email, galleryId, imageId) {
  const key = `${email}:${galleryId}`;
  const list = demoFavorites.get(key) || [];
  if (list.length >= 50 || list.includes(imageId)) return list;
  list.push(imageId);
  demoFavorites.set(key, list);
  return list;
}

function removeDemoFavorite(email, galleryId, imageId) {
  const key = `${email}:${galleryId}`;
  const list = (demoFavorites.get(key) || []).filter((id) => id !== imageId);
  demoFavorites.set(key, list);
  return list;
}

module.exports = {
  isDemo,
  getDemoGallery,
  hasDemoAccess,
  getDemoGalleryIdForEmail,
  getDemoFavorites,
  addDemoFavorite,
  removeDemoFavorite,
  DEMO_GALLERY,
  DEMO_ACCESS
};
