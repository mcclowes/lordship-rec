import {describe, expect, it} from 'vitest';
import plugin from './index.js';

const {excerptFrom, toIsoDate, slugFrom} = plugin;

describe('excerptFrom', () => {
  it('takes the text before the MDX truncate marker', () => {
    const body = 'The first paragraph.\n\n{/* truncate */}\n\nHidden tail.';
    expect(excerptFrom(body)).toBe('The first paragraph.');
  });

  it('also honours the HTML comment truncate marker', () => {
    const body = 'Visible intro.\n\n<!-- truncate -->\n\nRest.';
    expect(excerptFrom(body)).toBe('Visible intro.');
  });

  it('strips markdown links down to their text', () => {
    expect(excerptFrom('See [the minutes](https://example.com/x.pdf) here.')).toBe(
      'See the minutes here.',
    );
  });

  it('skips headings and import lines to find the first real paragraph', () => {
    const body = "import Thing from 'x';\n\n# A heading\n\nThe actual lede.";
    expect(excerptFrom(body)).toBe('The actual lede.');
  });

  it('truncates long paragraphs with an ellipsis', () => {
    const long = `${'word '.repeat(60)}`.trim();
    const out = excerptFrom(long);
    expect(out.length).toBeLessThanOrEqual(180);
    expect(out.endsWith('…')).toBe(true);
  });
});

describe('toIsoDate', () => {
  it('formats a Date object as yyyy-mm-dd', () => {
    expect(toIsoDate(new Date(Date.UTC(2026, 4, 6)), 'x.mdx')).toBe('2026-05-06');
  });

  it('passes through an ISO string', () => {
    expect(toIsoDate('2026-05-06', 'x.mdx')).toBe('2026-05-06');
  });

  it('falls back to the filename date prefix when frontmatter has none', () => {
    expect(toIsoDate(undefined, '2026-05-06-friends-update.mdx')).toBe('2026-05-06');
  });
});

describe('slugFrom', () => {
  it('prefers the explicit frontmatter slug', () => {
    expect(slugFrom({slug: 'custom'}, '2026-05-06-thing.mdx')).toBe('custom');
  });

  it('derives a slug from the filename when none is given', () => {
    expect(slugFrom({}, '2026-05-06-friends-update.mdx')).toBe('friends-update');
  });
});
