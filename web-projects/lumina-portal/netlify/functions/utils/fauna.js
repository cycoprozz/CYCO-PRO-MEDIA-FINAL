const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET || ''
});

/**
 * Get gallery by human-readable code (e.g. WED-2025-001).
 * Requires Fauna index: galleries_by_code, terms: [['data', 'code']], unique: true
 * @param {object} q - faunadb.query
 * @param {string} code - gallery code
 * @returns {Promise<{ref: object, data: object}>}
 */
async function getGalleryByCode(code) {
  const result = await client.query(
    q.Get(q.Match(q.Index('galleries_by_code'), code))
  );
  return result;
}

module.exports = { faunaClient: client, q, getGalleryByCode };
