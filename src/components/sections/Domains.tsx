import { ThreadBeat } from '@/components/ThreadBeat';

const domains = [
  {
    url: 'poteto.com',
    image: 'site-poteto-com',
    text: 'A potato. Three million views.',
  },
  {
    url: 'thibaultsottiaux.com',
    image: 'site-thibaultsottiaux-com',
    text: 'Registered by Alexandr Wang. Redirects to Meta’s Muse.',
  },
  {
    url: 'tibo.dog',
    image: 'site-tibo-dog-title',
    text: '$5.99. Domain acquired.',
  },
];

export function Domains() {
  return (
    <section
      id="domains"
      className="chapter container"
      aria-labelledby="domains-title"
    >
      <div className="chapter-label">
        <span>OCT 27 – NOV 01</span>
        <span>THREE DOMAINS LATER</span>
      </div>
      <h2 id="domains-title">THE DOMAIN WARS</h2>
      <div
        className="domain-windows"
        id="domain-windows"
        aria-label="The three domains"
      >
        {domains.map((d) => (
          <figure className="browser-window" key={d.url}>
            <div className="browser-chrome">
              <span aria-hidden="true">● ● ●</span>
              <a
                href={`https://${d.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {d.url} ↗
              </a>
            </div>
            <img
              src={`/images/${d.image}.webp`}
              width="1400"
              height="802"
              alt={`Captured website: ${d.url}. ${d.text}`}
              loading="lazy"
            />
            <figcaption>{d.text}</figcaption>
          </figure>
        ))}
      </div>
      <div className="snap-dots" aria-label="Choose a domain">
        {domains.map((d, i) => (
          <button
            key={d.url}
            aria-label={`Show ${d.url}`}
            aria-controls="domain-windows"
            aria-pressed={i === 0}
            data-slide={i}
          >
            <span />
          </button>
        ))}
      </div>
      <div className="domain-posts">
        <ThreadBeat ids={['domain', 'afford', 'views', 'popular']} />
      </div>
      <p className="caption">A THIRD PARTY HAS ENTERED THE CHAT.</p>
    </section>
  );
}
