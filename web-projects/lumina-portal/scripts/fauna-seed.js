#!/usr/bin/env node
/**
 * Seed one sample gallery and one access record for testing.
 * Run after fauna-setup. Uses FAUNA_SECRET from .env or env.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const faunadb = require('faunadb');
const q = faunadb.query;

const secret = process.env.FAUNA_SECRET;
if (!secret || secret === 'your-fauna-db-secret') {
  console.error('Set FAUNA_SECRET to your real Fauna key and run again.');
  process.exit(1);
}

const client = new faunadb.Client({ secret });

const SAMPLE_GALLERY = {
  code: 'WED-2025-001',
  title: 'Sample Wedding Gallery',
  category: 'Wedding',
  date: '2025-06-15',
  location: 'Napa Valley',
  expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  images: [
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', title: 'Ceremony', meta: 'Outdoor' },
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', title: 'Portrait', meta: 'Golden hour' },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=85', title: 'Reception', meta: 'Evening' }
  ]
};

const SAMPLE_ACCESS = {
  email: 'client@example.com',
  galleryId: 'WED-2025-001'
};

async function main() {
  try {
    await client.query(
      q.Create(q.Collection('galleries'), { data: SAMPLE_GALLERY })
    );
    console.log('Created gallery:', SAMPLE_GALLERY.code);
  } catch (e) {
    if (e.description && e.description.includes('unique')) {
      console.log('Gallery already exists:', SAMPLE_GALLERY.code);
    } else throw e;
  }

  try {
    await client.query(
      q.Create(q.Collection('access'), { data: SAMPLE_ACCESS })
    );
    console.log('Created access for', SAMPLE_ACCESS.email, '→', SAMPLE_ACCESS.galleryId);
  } catch (e) {
    if (e.description && e.description.includes('unique')) {
      console.log('Access already exists for', SAMPLE_ACCESS.email);
    } else throw e;
  }

  console.log('\nYou can log in with:');
  console.log('  Email:', SAMPLE_ACCESS.email);
  console.log('  Gallery code:', SAMPLE_ACCESS.galleryId);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
