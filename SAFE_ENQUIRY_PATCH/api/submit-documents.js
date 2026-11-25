const { json } = require('../lib/shared');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed.' });
  return json(res, 503, {
    ok: false,
    error: 'Document upload is not available yet. Please contact AKONDO GLOBAL WORLD directly. Do not email passport or identity documents until a verified secure upload channel is provided.'
  });
};
module.exports.config = { api: { bodyParser: false } };
