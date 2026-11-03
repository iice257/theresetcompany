import { PostCard } from '@/components/PostCard';
import { StoryControls, ShareControls } from '@/components/StoryControls';
import { days, weeks } from '@/content/days';
import { memes } from '@/content/memes';
import { DayBlock } from '@/components/DayBlock';

export function Graduation() { return <>
<section id="graduation" className="chapter container" aria-labelledby="graduation-title"><div className="chapter-label"><span>DAY 25 / OCT 29</span><span>GRADUATION</span></div><h2 id="graduation-title" className="graduation-title">THE <span className="replacement"><span className="token-word">TOKEN</span><s>RESET</s></span><br/>COMPANY</h2><div className="graduation-posts"><PostCard id="token"/><PostCard id="double"/><p className="caption">6.9M VIEWS. LIMITS DOUBLED.</p><figure className="callback"><img src="/images/cartoon.webp" width="180" height="110" loading="lazy" alt="The original Reset Company cartoon, 25 days earlier."/><figcaption className="mono">CALLBACK:<br/>25 DAYS LATER.</figcaption></figure><PostCard id="feedback"/><PostCard id="complaints"/></div></section>
</>; }
