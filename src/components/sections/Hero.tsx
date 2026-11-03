import { StoryControls } from '@/components/StoryControls';

export function Hero() {
  return (
    <>
      <section className="hero container" aria-labelledby="title">
        <div className="masthead mono">
          <span>VOL. 01</span>
          <span>OCT 04 – NOV 01 2026</span>
          <span>
            <a href="https://x.com/thsottiaux">@thsottiaux</a> ×{' '}
            <a href="https://x.com/poteto">@poteto</a>
          </span>
        </div>
        <h1 id="title">
          <span>THE</span> <span>RESET</span> <span>COMPANY</span>
        </h1>
        <p className="hero-subline">
          28 days. 15 ships.
          <span className="mobile-break" /> 13 resets. One potato.
        </p>
        <StoryControls />
      </section>
    </>
  );
}
