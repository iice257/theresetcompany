import { posts, type Post, type PostKey } from '@/content/posts';

export function PostCard({ id, post }: { id?: PostKey; post?: Post }) {
  const p = post ?? posts[id!];
  return <article className={`post post--${p.author}`} data-reveal>
    <a className="post-link" href={p.url} target="_blank" rel="noopener noreferrer">
      <header className="post-head">
        {p.author !== 'other' ? <img src={`/avatars/${p.handle}.webp`} width="32" height="32" alt="" loading="lazy" /> : <span className="avatar-fallback">AJ</span>}
        <span><strong>{p.name}</strong><span className="handle">@{p.handle}</span></span>
        <time dateTime={p.date}>{new Date(p.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'2-digit',timeZone:'UTC'})}</time>
        <span aria-hidden="true">↗</span>
      </header>
      <p className="post-text">{p.text}</p>
      <footer className="post-foot"><span>{p.likes ? `♥ ${p.likes}` : 'EXCERPT'}</span><span>{p.search ? 'FIND EXACT TEXT ON X ↗' : 'VIEW POST ON X ↗'}</span></footer>
    </a>
    {p.receipt && <details className="receipt"><summary>See the receipt <span aria-hidden="true">+</span></summary><img src={`/images/${p.receipt}.webp`} width="599" height={p.receipt.includes('large')?358:434} alt={`Original X capture: @${p.handle}: ${p.text}`} loading="lazy" /></details>}
  </article>;
}
