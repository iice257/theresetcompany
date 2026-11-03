import { PostCard } from '@/components/PostCard';

export function Cartoon() {
  return <section id="cartoon" className="chapter container" aria-labelledby="cartoon-title">
    <div className="chapter-label"><span>DAY 00</span><span>OCT 04, 2026</span></div>
    <h2 id="cartoon-title">THE CARTOON</h2>
    <div className="cartoon-scroll">
      <div className="cartoon-stage">
        <figure className="cartoon-art">
          <a href="https://x.com/poteto/status/2106836662898897115" target="_blank" rel="noopener noreferrer"><img src="/images/cartoon.webp" alt="Potetoâ€™s two-panel cartoon: The Reset Company serves a messy plate; The Ship Company serves careful dishes beneath a rocket launch." width="1400" height="852" loading="lazy"/></a>
          <figcaption className="mono">CARTOON BY <a href="https://x.com/poteto">@poteto â†—</a></figcaption>
        </figure>
        <div className="cartoon-frames">
          <div className="cartoon-frame frame-caption"><span className="mono">14:59 PT</span><PostCard id="cartoon"/></div>
          <div className="cartoon-frame frame-clock"><div className="clock"><span className="clock-value">+00:34</span><span className="mono">MINUTES LATER</span></div></div>
          <div className="cartoon-frame frame-kickoff"><PostCard id="kickoff"/></div>
          <div className="cartoon-frame frame-challenge"><PostCard id="challenge"/></div>
          <div className="cartoon-frame frame-chart"><PostCard id="battle"/><div className="bar-chart" role="img" aria-label="Hype: tall green bar. Quality: tiny red bar."><div><i className="hype-bar"/><span>HYPE</span></div><div><i className="quality-bar"/><span>QUALITY</span></div></div></div>
        </div>
      </div>
    </div>
    <p className="caption">THE RULES: SHIP SOMETHING, OR RESET EVERYONE.</p>
  </section>;
}
