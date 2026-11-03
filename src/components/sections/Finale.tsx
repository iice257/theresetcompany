import { PostCard } from '@/components/PostCard';
import { StoryControls, ShareControls } from '@/components/StoryControls';
import { days, weeks } from '@/content/days';
import { memes } from '@/content/memes';
import { DayBlock } from '@/components/DayBlock';

export function Finale() { return <>
<section id="finale" className="chapter container" aria-labelledby="finale-title"><div className="chapter-label"><span>NOV 01 / THE FINALE</span><span>GAME BY @poteto</span></div><h2 id="finale-title">TIBO.DOG</h2><PostCard id="game"/><p className="caption">SHE USED HIS FORMAT.</p><figure className="gameplay"><img src="/images/site-tibo-dog-gameplay.webp" width="1400" height="802" loading="lazy" alt="Tibo.dog gameplay: the player faces waves of users demanding resets."/><figcaption className="mono">GAME BY <a href="https://x.com/poteto">@poteto ↗</a></figcaption></figure><a className="game-stats mono" href="https://x.com/poteto/status/2117043478140276847" target="_blank" rel="noopener noreferrer">4 DAYS · ~1,150 PRS · 124 KB · 10 LANGUAGES<br/>0 AUDIO FILES · 0 CODE COMMENTS (BANNED BY LINT) ↗</a><div className="closing-chain"><PostCard id="planned"/><PostCard id="months2"/><PostCard id="compute"/><PostCard id="finished"/></div><a href="https://tibo.dog" target="_blank" rel="noopener noreferrer" className="play-link">PLAY TIBO.DOG <span>↗</span></a></section>
</>; }
