import {describe, expect, it} from 'vitest';
import {editionNumber, formatDate} from './masthead.utils';

describe('editionNumber', () => {
  it('starts at No. 1 in the first week of 2001', () => {
    expect(editionNumber(new Date(2001, 0, 1))).toBe('No. 1');
    expect(editionNumber(new Date(2001, 0, 7))).toBe('No. 1');
  });

  it('increments by one each week', () => {
    expect(editionNumber(new Date(2001, 0, 8))).toBe('No. 2');
    expect(editionNumber(new Date(2001, 0, 15))).toBe('No. 3');
  });

  it('never goes below No. 1 for dates before the epoch', () => {
    expect(editionNumber(new Date(2000, 0, 1))).toBe('No. 1');
  });

  it('produces a sensible number for a date 25 years on', () => {
    // ~25 years is roughly 1304 weeks; assert it's in a believable range.
    const n = Number(editionNumber(new Date(2026, 0, 1)).replace('No. ', ''));
    expect(n).toBeGreaterThan(1300);
    expect(n).toBeLessThan(1320);
  });
});

describe('formatDate', () => {
  it('formats a date in British long form', () => {
    expect(formatDate(new Date(2026, 5, 8))).toBe('Monday, 8 June 2026');
  });
});
