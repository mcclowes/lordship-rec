const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Display labels for the tag slugs used in blog/tags.yml. Kept in sync by hand
// because there are only a handful; if the tag set grows, read tags.yml instead.
const TAG_LABELS = {
  events: 'Events',
  volunteering: 'Volunteering',
  wildlife: 'Wildlife',
  regeneration: 'Regeneration',
};

const TRUNCATE_MARKERS = ['{/* truncate */}', '<!-- truncate -->', '<!--truncate-->'];

function excerptFrom(body) {
  let text = body;
  for (const marker of TRUNCATE_MARKERS) {
    const i = text.indexOf(marker);
    if (i !== -1) {
      text = text.slice(0, i);
      break;
    }
  }
  // Take the first real paragraph, then strip the markdown we don't want to render.
  const paragraph =
    text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith('#') && !p.startsWith('import ')) ?? '';
  const plain = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 180 ? `${plain.slice(0, 177).trimEnd()}…` : plain;
}

function toIsoDate(value, filename) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && value) return value.slice(0, 10);
  // Fall back to the YYYY-MM-DD prefix every blog filename carries.
  const m = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '';
}

function slugFrom(data, filename) {
  if (data.slug) return data.slug;
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
}

/**
 * Reads the blog/ folder at build time and exposes the most recent posts as
 * global data, so the homepage can show real, linkable news instead of a
 * hand-copied snapshot that drifts out of date.
 */
module.exports = function recentNewsPlugin(_context, options) {
  const blogDir = path.resolve(options?.blogDir ?? 'blog');
  const limit = options?.limit ?? 7;

  return {
    name: 'recent-news',

    async loadContent() {
      const files = fs
        .readdirSync(blogDir)
        .filter((f) => /\.mdx?$/.test(f) && /^\d{4}-\d{2}-\d{2}-/.test(f));

      const posts = files
        .map((filename) => {
          const raw = fs.readFileSync(path.join(blogDir, filename), 'utf8');
          const {data, content} = matter(raw);
          const tag = Array.isArray(data.tags) ? data.tags[0] : data.tags;
          return {
            slug: slugFrom(data, filename),
            title: data.title ?? slugFrom(data, filename),
            date: toIsoDate(data.date, filename),
            tag: TAG_LABELS[tag] ?? (tag ? String(tag) : 'News'),
            excerpt: data.description ?? excerptFrom(content),
          };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, limit);

      return posts;
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({posts: content});
    },

    getPathsToWatch() {
      return [path.join(blogDir, '*.mdx'), path.join(blogDir, '*.md')];
    },
  };
};

// Exposed for unit tests.
module.exports.excerptFrom = excerptFrom;
module.exports.toIsoDate = toIsoDate;
module.exports.slugFrom = slugFrom;
