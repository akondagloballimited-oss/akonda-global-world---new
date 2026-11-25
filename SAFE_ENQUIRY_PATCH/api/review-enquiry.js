const { html } = require('../lib/shared');
module.exports = async function handler(req, res) {
  return html(res, 410, 'Online review workflow unavailable', 'Automated approval and document-upload links are disabled while the secure workflow is being completed. Please review enquiries manually using your business email.');
};
