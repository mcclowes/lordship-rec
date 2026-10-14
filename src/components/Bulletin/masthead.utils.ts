// Pure date helpers for the masthead. Kept separate from the component so they
// can be unit tested without rendering React.

const EPOCH = new Date(2001, 0, 1).getTime();
const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// A whimsical "edition number" that counts weeks since the Friends formed in
// 2001. Starts at No. 1 in the first week of 2001.
export function editionNumber(d: Date): string {
  const weeks = Math.max(0, Math.floor((d.getTime() - EPOCH) / WEEK_MS));
  return `No. ${weeks + 1}`;
}
