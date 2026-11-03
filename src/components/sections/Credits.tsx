import { PostCard } from '@/components/PostCard';
import { StoryControls, ShareControls } from '@/components/StoryControls';
import { days, weeks } from '@/content/days';
import { memes } from '@/content/memes';
import { DayBlock } from '@/components/DayBlock';

export function Credits() { return <>
<section className="credits chapter container" aria-labelledby="credits-title"><div className="chapter-label"><span>END OF VOL. 01</span><a href="#title">BACK TO TOP ↑</a></div><h2 id="credits-title" className="sr-only">The final tally</h2><div className="end-tally">{[['28','DAYS'],['15','SHIPS'],['13','RESETS'],['1','CARTOON'],['3','DOMAINS'],['1,150','PRS'],['1','POTATO']].map(([n,label])=><div key={label} className={label==='RESETS'?'red':''}><span>{n}</span><span>{label}{label==='RESETS'&&<small className="mono">(2 BANKED)</small>}</span></div>)}</div><p className="season mono">SEASON 2? UNCONFIRMED.</p><ShareControls/></section>
</>; }
