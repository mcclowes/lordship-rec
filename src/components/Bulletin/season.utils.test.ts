import {describe, expect, it} from 'vitest';
import {seasonForMonth} from './season.utils';

describe('seasonForMonth', () => {
  it('maps winter months (Dec, Jan, Feb)', () => {
    expect(seasonForMonth(11)).toBe('winter'); // December
    expect(seasonForMonth(0)).toBe('winter'); // January
    expect(seasonForMonth(1)).toBe('winter'); // February
  });

  it('maps spring months (Mar–May)', () => {
    expect(seasonForMonth(2)).toBe('spring');
    expect(seasonForMonth(4)).toBe('spring');
  });

  it('maps summer months (Jun–Aug)', () => {
    expect(seasonForMonth(5)).toBe('summer');
    expect(seasonForMonth(7)).toBe('summer');
  });

  it('maps autumn months (Sep–Nov)', () => {
    expect(seasonForMonth(8)).toBe('autumn');
    expect(seasonForMonth(10)).toBe('autumn');
  });

  it('handles the boundaries that off-by-one bugs love', () => {
    // The seams between seasons are where the < and === comparisons matter.
    expect(seasonForMonth(2)).toBe('spring'); // Feb -> Mar
    expect(seasonForMonth(5)).toBe('summer'); // May -> Jun
    expect(seasonForMonth(8)).toBe('autumn'); // Aug -> Sep
    expect(seasonForMonth(11)).toBe('winter'); // Nov -> Dec
  });

  it('covers all twelve months with a valid season', () => {
    const seasons = Array.from({length: 12}, (_, m) => seasonForMonth(m));
    expect(seasons).toHaveLength(12);
    expect(new Set(seasons)).toEqual(new Set(['winter', 'spring', 'summer', 'autumn']));
  });
});
