#!/usr/bin/env node
/**
 * One-time Fauna schema setup. Requires FAUNA_SECRET in .env or env.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const faunadb = require('faunadb');
const q = faunadb.query;

const secret = process.env.FAUNA_SECRET;
if (!secret || secret === 'your-fauna-db-secret') {
  console.error('Set FAUNA_SECRET in .env to your real Fauna key and run again.');
  process.exit(1);
}

const client = new faunadb.Client({ secret });

const COLLECTIONS = ['galleries', 'images', 'clients', 'favorites', 'access', 'downloads', 'shares'];

const INDEXES = [
  {
    name: 'galleries_by_code',
    source: q.Collection('galleries'),
    terms: [{ field: ['data', 'code'] }],
    unique: true
  },
  {
    name: 'access_by_email',
    source: q.Collection('access'),
    terms: [{ field: ['data', 'email'] }]
  },
  {
    name: 'access_by_email_gallery',
    source: q.Collection('access'),
    terms: [{ field: ['data', 'email'] }, { field: ['data', 'galleryId'] }],
    unique: true
  },
  {
    name: 'favorites_by_user_gallery',
    source: q.Collection('favorites'),
    terms: [{ field: ['data', 'userEmail'] }, { field: ['data', 'galleryId'] }]
  },
  {
    name: 'favorite_by_user_image',
    source: q.Collection('favorites'),
    terms: [{ field: ['data', 'userEmail'] }, { field: ['data', 'imageId'] }],
    unique: true
  }
];

async function createCollection(name) {
  try {
    await client.query(q.CreateCollection({ name }));
    console.log('Created collection:', name);
  } catch (e) {
    if (e.description && e.description.includes('already exists')) {
      console.log('Collection already exists:', name);
    } else throw e;
  }
}

async function createIndex(def) {
  try {
    await client.query(
      q.CreateIndex({
        name: def.name,
        source: def.source,
        terms: def.terms,
        unique: def.unique || false
      })
    );
    console.log('Created index:', def.name);
  } catch (e) {
    if (e.description && e.description.includes('already exists')) {
      console.log('Index already exists:', def.name);
    } else throw e;
  }
}

async function main() {
  for (const name of COLLECTIONS) {
    await createCollection(name);
  }
  for (const index of INDEXES) {
    await createIndex(index);
  }
  console.log('Done. Add a gallery document with "code" and "images", and an access document with "email" and "galleryId".');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
