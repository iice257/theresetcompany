import { PostCard } from '@/components/PostCard';
import { ThreadBeat } from '@/components/ThreadBeat';

export function Finale() {
  return (
    <section
      id="finale"
      className="chapter container"
      aria-labelledby="finale-title"
    >
      <div className="chapter-label">
        <span>NOV 01 / THE FINALE</span>
        <span>GAME BY @poteto</span>
      </div>
      <h2 id="finale-title">TIBO.DOG</h2>
      <PostCard id="game" />
      <p className="caption">SHE USED HIS FORMAT.</p>
      <figure className="gameplay">
        <img
          src="/images/site-tibo-dog-gameplay.webp"
          width="1400"
          height="802"
          loading="lazy"
          alt="Tibo.dog gameplay: the player faces waves of users demanding resets."
        />
        <figcaption className="mono">
          GAME BY <a href="https://x.com/poteto">@poteto ↗</a>
        </figcaption>
      </figure>
      <a
        className="game-stats mono"
        href="https://x.com/poteto/status/2117043478140276847"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <b data-count-to="4">4</b> DAYS
        </span>
        <span>
          ~<b data-count-to="1150">1,150</b> PRS
        </span>
        <span>
          <b data-count-to="124">124</b> KB
        </span>
        <span>
          <b data-count-to="10">10</b> LANGUAGES
        </span>
        <small>0 AUDIO FILES · 0 CODE COMMENTS (BANNED BY LINT) ↗</small>
      </a>
      <div className="closing-chain">
        <ThreadBeat ids={['compute', 'finished', 'planned', 'months2']} />
      </div>
      <a
        href="https://tibo.dog"
        target="_blank"
        rel="noopener noreferrer"
        className="play-link"
      >
        PLAY TIBO.DOG <span>↗</span>
      </a>
    </section>
  );
}
