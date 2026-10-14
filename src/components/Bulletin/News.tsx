import {useMemo, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';

type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  tag: string;
  excerpt: string;
};

function formatDate(iso: string): string {
  // Parse as a plain date to avoid timezone drift on the day boundary.
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function News(): ReactNode {
  const data = usePluginData('recent-news') as {posts?: Post[]} | undefined;
  const posts = data?.posts ?? [];

  const tags = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((n) => n.tag)))],
    [posts],
  );
  const [tag, setTag] = useState('All');
  const list = useMemo(
    () => (tag === 'All' ? posts : posts.filter((n) => n.tag === tag)),
    [posts, tag],
  );

  return (
    <section id="news" className="section">
      <div className="container">
        <div className="section__title">
          <h2>
            From the <em>journal</em>
          </h2>
          <p className="lede">
            A working record of what the Friends have been up to. The latest
            posts, straight from the news page.
          </p>
          <span className="col">Latest from the news</span>
        </div>

        <div className="journal">
          <div className="journal__filter" role="group" aria-label="Filter news by topic">
            <b>Filter</b>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className={t === tag ? 'active' : ''}
                aria-pressed={t === tag}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {list.length === 0 ? (
            <p className="lede">No posts to show yet. Check the news page.</p>
          ) : (
            list.map((n, i) => (
              <article
                key={n.slug}
                className={`story ${i === 0 && tag === 'All' ? 'story--lead' : ''}`}
              >
                <div className="story__date">{formatDate(n.date)}</div>
                <span className="story__tag">{n.tag}</span>
                <h3>
                  <Link to={`/news/${n.slug}`}>{n.title}</Link>
                </h3>
                <p>{n.excerpt}</p>
                <Link className="story__more" to={`/news/${n.slug}`}>
                  Read in full →
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
