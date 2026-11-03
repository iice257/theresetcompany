import { PostCard } from '@/components/PostCard';
import { ThreadBeat } from '@/components/ThreadBeat';

export function Graduation() {
  return <section id="graduation" className="chapter container" aria-labelledby="graduation-title">
    <div className="chapter-label"><span>DAY 25 / OCT 29</span><span>GRADUATION</span></div>
    <h2 id="graduation-title" className="graduation-title" aria-label="The Reset Company becomes The Token Company">
      THE <span className="replacement">
        <span className="token-word" aria-hidden="true">{'TOKEN'.split('').map((c,i) => <span key={i}>{c}</span>)}<i className="type-caret"/></span>
        <span className="reset-word" aria-hidden="true">RESET<svg className="strike graduation-strike" viewBox="0 0 400 30" preserveAspectRatio="none"><path d="M2 20 L398 9" pathLength="1"/></svg></span>
      </span><br/>COMPANY
    </h2>
    <div className="graduation-posts">
      <PostCard id="token"/><PostCard id="double"/>
      <p className="caption">6.9M VIEWS. LIMITS DOUBLED.</p>
      <figure className="callback"><img src="/images/cartoon.webp" width="180" height="110" loading="lazy" alt="The original Reset Company cartoon, 25 days earlier."/><figcaption className="mono">CALLBACK:<br/>25 DAYS LATER.</figcaption></figure>
      <details className="thread-more"><summary>+ 2 more in the thread <span aria-hidden="true">↗</span></summary><ThreadBeat ids={['feedback','complaints']}/></details>
    </div>
  </section>;
}
