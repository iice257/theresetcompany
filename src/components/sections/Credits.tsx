import { ShareControls } from '@/components/StoryControls';

const totals = [[28,'DAYS'],[15,'SHIPS'],[13,'RESETS'],[1,'CARTOON'],[3,'DOMAINS'],[1150,'PRS'],[1,'POTATO']] as const;

export function Credits() {
  return <section className="credits chapter container" aria-labelledby="credits-title">
    <div className="chapter-label"><span>END OF VOL. 01</span><a href="#title">BACK TO TOP ↑</a></div>
    <h2 id="credits-title" className="sr-only">The final tally</h2>
    <div className="end-tally">{totals.map(([number,label]) => <div key={label} className={label === 'RESETS' ? 'red' : ''}>
      <span data-count-to={number}>{number.toLocaleString('en-US')}</span><span>{label}{label === 'RESETS' && <small className="mono">(2 BANKED)</small>}</span>
      {label === 'POTATO' && <div className="credits-reset" aria-label="One last reset"><img src="/images/button-up.webp" width="120" height="123" loading="lazy" alt="The reset button, one last time."/><img className="button-down" src="/images/button-down.webp" width="120" height="123" loading="lazy" alt=""/></div>}
    </div>)}</div>

    <p className="season mono">SEASON 2? UNCONFIRMED.</p>
    <ShareControls/>
  </section>;
}
