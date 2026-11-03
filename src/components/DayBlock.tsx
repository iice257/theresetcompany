import type { Day } from '@/content/days';
import { ThreadBeat } from './ThreadBeat';

export function DayBlock({ day }: { day: Day }) {
  const feature = !!day.beats;
  const date = new Date(day.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' });
  return <article id={`day-${day.day}`} className={`day ${feature ? 'day--feature' : 'day--compact'}`} data-day={day.day}>
    <header className="day-heading">
      <h3 className="outline-type">DAY {String(day.day).padStart(2, '0')}</h3>
      <div className="day-meta"><time dateTime={day.date}>{date}</time><span className={`tag tag--${day.type}`}>{day.type.toUpperCase()}</span></div>
    </header>
    <a className={feature ? 'day-summary feature-summary' : 'day-summary'} href={`https://x.com/thsottiaux/status/${day.status}`} target="_blank" rel="noopener noreferrer">{day.summary}<span aria-hidden="true">↗</span></a>
    {day.extra?.kind === 'stamp' && <div className="ship-stack" data-stamp-scene>
      <ol>{day.extra.items.map((text, i) => <li key={text}><span className="ship-check" aria-hidden="true">✓</span>{day.extra?.kind === 'stamp' && day.extra.numbered && <span className="mono">2.{i + 1}</span>}{text}</li>)}</ol>
      <span className="stamp">RESET</span>
      {day.extra.caption && <p className="caption stamp-caption">{day.extra.caption}</p>}
    </div>}
    {day.extra?.kind === 'cooking' && <div className="cooking-change">
      <span className="cooked-word">WE’RE COOKED.<svg className="strike" viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true"><path d="M2 20 L398 9" pathLength="1"/></svg></span>
      <span className="cooking-typed" aria-label="STILL COOKING.">{'STILL COOKING.'.split('').map((c, i) => <span key={i} aria-hidden="true">{c}</span>)}</span>
    </div>}
    {day.beats && <ThreadBeat ids={day.beats} visible={1}/>}
    {day.caption && <p className="caption">{day.caption}</p>}
  </article>;
}
