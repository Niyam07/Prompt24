/**
 * Marketplace pack helpers
 */

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const ASSET_COUNTS = [10, 11, 12, 13, 14, 15];

const getAssetCount = (packIndex) => ASSET_COUNTS[packIndex % ASSET_COUNTS.length];

const createAsset = (title, packSlug, tags, content) => ({
  title,
  slug: `${packSlug}-${slugify(title)}`,
  tags,
  content
});

const createPack = ({ name, category, description, tags, assets }) => ({
  name,
  category,
  version: '1.0.0',
  price: 0,
  tags,
  description,
  assets
});

const buildPrompt = ({ role, task, context, constraints, output }) =>
  [
    '# ROLE',
    role,
    '',
    '# TASK',
    task,
    '',
    '# CONTEXT',
    context,
    '',
    '# CONSTRAINTS',
    constraints,
    '',
    '# OUTPUT',
    output
  ].join('\n');

module.exports = {
  slugify,
  getAssetCount,
  createAsset,
  createPack,
  buildPrompt
};
