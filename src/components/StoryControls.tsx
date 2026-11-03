import { SITE_URL } from '@/content/site';
function Digits({className = '', value = 0}: {className?: string; value?: number}) { return <span className={`odometer ${className}`} role="img" aria-label={String(value)} data-value={value}>{String(value).padStart(2, '0').split('').map((digit, i) => <span className="digit-window" key={i} aria-hidden="true"><span className="digit-strip" style={{transform:`translateY(-${Number(digit) * 10}%)`}}>{Array.from({length:10},(_,n)=><span key={n}>{n}</span>)}</span></span>)}</span>; }
export function StoryControls(){return <>
<div className="hero-control"><button className="reset-object" aria-label="Press reset and start the story"><img src="/images/button-up.webp" alt="" width="520" height="532" fetchPriority="high"/><img className="button-down" src="/images/button-down.webp" alt="" width="520" height="532" loading="lazy"/></button><button className="press-label">PRESS TO SCROLL <span aria-hidden="true">⌄</span></button></div>
<button className="sound-toggle mono" aria-pressed="false">SOUND OFF <span aria-hidden="true">○</span></button>
<aside className="hud" aria-label="Sprint progress" aria-hidden="true" inert>
<button className="hud-button" aria-label="Jump to next reset day"><img src="/images/button-up.webp" width="80" height="82" alt="" loading="lazy"/></button>
<div className="hud-day mono">DAY <Digits className="day-count" value={1}/><span>/28</span></div>
<div className="hud-counts mono"><span>SHIPS <Digits className="ship-count"/></span><span>RESETS <Digits className="reset-count"/></span></div>
</aside>
<dialog className="egg" aria-label="Your unofficial reset card"><button className="egg-close mono">CLOSE ×</button><p>“People have escaped the TL and are asking me for resets on the street now.”</p><span className="mono">— @thsottiaux</span><img src="/images/reset-card.webp" width="800" height="492" alt="One full reset. Unofficial. Not redeemable." loading="lazy"/><a className="text-link" href="#street">RESETS ON THE STREET ↗</a></dialog>
</>;}
export function ShareControls(){return <div className="share-controls"><a className="solid-link" target="_blank" rel="noopener noreferrer" href={`https://x.com/intent/post?text=${encodeURIComponent('The Reset Company — 28 days of ships, resets and one potato. @thsottiaux @poteto')}&url=${encodeURIComponent(SITE_URL)}`}>SHARE ON X ↗</a><button className="outline-link copy-link">COPY LINK ↗</button><span className="sr-only copy-status" role="status"/><input className="copy-fallback" hidden aria-label="Select and copy the site link" readOnly value={SITE_URL}/></div>;}
