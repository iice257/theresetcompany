import { memes } from '@/content/memes';

export function Memes() {
  return (
    <>
      {memes.length > 0 && (
        <section className="chapter container" aria-labelledby="memes-title">
          <h2 id="memes-title">THE TIMELINE REACTS</h2>
          <div className="meme-wall">
            {memes.map((m) => (
              <a key={m.file} href={m.url}>
                <img src={m.file} alt={m.alt} loading="lazy" />
                <span>{m.credit}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
