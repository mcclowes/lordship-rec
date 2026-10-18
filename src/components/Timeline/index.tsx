import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {eras, events, type EraKey} from './data';
import styles from './styles.module.css';

const accentForEra = (key: EraKey): string =>
  `var(${eras.find((e) => e.key === key)?.accent ?? '--moss'})`;

export default function Timeline(): React.JSX.Element {
  const trackRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0); // 0–1, how far the spine has filled

  const activeEra = events[active]?.era ?? eras[0].key;

  // Smoothly track scroll progress so the spine fills as you read.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const anchor = window.innerHeight * 0.5; // fill up to the viewport midline
    const progress = (anchor - rect.top) / rect.height;
    setFill(Math.min(1, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    setMounted(true);

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      setRevealed(new Set(events.map((_, i) => i)));
      setFill(1);
      return;
    }

    // Reveal each event as it enters, and mark the centre-most one active.
    const reveal = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              next.add(Number((entry.target as HTMLElement).dataset.index));
            }
          }
          return next;
        });
      },
      {rootMargin: '0px 0px -12% 0px', threshold: 0.15},
    );

    const spotlight = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      {rootMargin: '-45% 0px -45% 0px', threshold: 0},
    );

    for (const el of itemRefs.current) {
      if (!el) continue;
      reveal.observe(el);
      spotlight.observe(el);
    }

    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener('scroll', handler, {passive: true});
    window.addEventListener('resize', handler);
    onScroll();

    return () => {
      reveal.disconnect();
      spotlight.disconnect();
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
      cancelAnimationFrame(raf);
    };
  }, [onScroll]);

  const jumpToEra = useCallback((era: EraKey) => {
    const first = events.findIndex((e) => e.era === era);
    itemRefs.current[first]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, []);

  // Index of the first event in each era, for drawing era headings inline.
  const eraStarts = useMemo(() => {
    const map = new Map<number, EraKey>();
    for (const era of eras) {
      map.set(
        events.findIndex((e) => e.era === era.key),
        era.key,
      );
    }
    return map;
  }, []);

  return (
    <section
      className={styles.timeline}
      style={{['--tl-accent' as string]: accentForEra(activeEra)}}
      aria-label="A history of the Friends of Lordship Rec, 2001 to 2012">
      <nav className={styles.rail} aria-label="Jump to an era">
        {eras.map((era) => (
          <button
            key={era.key}
            type="button"
            className={styles.railItem}
            data-active={era.key === activeEra}
            style={{['--tl-accent' as string]: `var(${era.accent})`}}
            onClick={() => jumpToEra(era.key)}>
            <span className={styles.railYears}>{era.years}</span>
            <span className={styles.railLabel}>{era.label}</span>
          </button>
        ))}
      </nav>

      <ol className={styles.track} ref={trackRef}>
        <div className={styles.spine} aria-hidden="true">
          <span className={styles.spineFill} style={{transform: `scaleY(${fill})`}} />
        </div>

        {events.map((event, i) => {
          const era = eraStarts.get(i);
          const isOn = !mounted || revealed.has(i);
          return (
            <li
              key={event.date + event.title}
              data-index={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={styles.item}
              data-on={isOn}
              data-active={i === active}
              style={{['--tl-accent' as string]: accentForEra(event.era)}}>
              {era && (
                <h3 className={styles.eraHeading}>
                  {eras.find((e) => e.key === era)?.label}
                  <span className={styles.eraHeadingYears}>
                    {eras.find((e) => e.key === era)?.years}
                  </span>
                </h3>
              )}
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.card}>
                <p className={styles.date}>{event.date}</p>
                <h4 className={styles.title}>{event.title}</h4>
                <p className={styles.body}>{event.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
