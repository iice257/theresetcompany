import { posts } from '@/content/posts';

const replies = [
  'dots',
  'fear',
  'shaking',
  'months',
  'next',
  'roadmap',
  'fries',
] as const;

export function Prequel() {
  return (
    <section
      id="prequel"
      className="chapter container"
      aria-labelledby="prequel-title"
    >
      <div className="chapter-label">
        <span>THE PREQUEL</span>
        <span>OCT 03, 2026</span>
      </div>
      <h2 id="prequel-title">DOTS VS BOTS</h2>
      <ol className="chat-thread">
        {replies.map((id) => {
          const post = posts[id];
          return (
            <li key={id} className={`chat-reply chat--${post.author}`}>
              <img
                src={`/avatars/${post.handle}.webp`}
                width="28"
                height="28"
                loading="lazy"
                alt=""
              />
              <div>
                <span className="mono chat-author">@{post.handle}</span>
                <span className="typing" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chat-text"
                >
                  {post.text}
                  <span className="chat-arrow" aria-hidden="true">
                    {' '}
                    ↗
                  </span>
                </a>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="caption">NEGOTIATIONS CONCLUDED OVER LUNCH.</p>
    </section>
  );
}
