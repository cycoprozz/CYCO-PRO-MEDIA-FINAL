const API_BASE = '';

export async function authLogin(email, galleryId) {
  const res = await fetch(`${API_BASE}/api/auth-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, galleryId }),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function sessionCheck() {
  const res = await fetch(`${API_BASE}/api/session-check`, { credentials: 'include' });
  if (!res.ok) return null;
  return res.json();
}

export async function getGallery(galleryId) {
  const res = await fetch(`${API_BASE}/api/gallery-get/${galleryId}`, { credentials: 'include' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to load gallery');
  return data;
}

export async function saveFavorite(imageId, action, galleryId) {
  const res = await fetch(`${API_BASE}/api/favorites-save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageId, action, galleryId }),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to save');
  return data;
}

export async function downloadZip(imageIds, galleryId, quality = 'web') {
  const res = await fetch(`${API_BASE}/api/download-zip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageIds, galleryId, quality }),
    credentials: 'include'
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Download failed');
  }
  return res.blob();
}

export async function wowGenerate(imageId, template) {
  const res = await fetch(`${API_BASE}/api/wow-generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageId, template }),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Generation failed');
  return data;
}

export async function shareCreate(galleryId, expiresInHours) {
  const res = await fetch(`${API_BASE}/api/share-create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ galleryId, expiresInHours }),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Share failed');
  return data;
}

export function logout() {
  return fetch(`${API_BASE}/api/logout`, { method: 'POST', credentials: 'include' });
}
