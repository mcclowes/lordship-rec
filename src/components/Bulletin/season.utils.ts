export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * Maps a 0-indexed month (0 = January) to a meteorological season.
 * Winter: Dec, Jan, Feb. Spring: Mar–May. Summer: Jun–Aug. Autumn: Sep–Nov.
 */
export function seasonForMonth(month: number): SeasonKey {
  if (month < 2 || month === 11) return 'winter';
  if (month < 5) return 'spring';
  if (month < 8) return 'summer';
  return 'autumn';
}
