import { PostCard } from '@/components/PostCard';
import { StoryControls, ShareControls } from '@/components/StoryControls';
import { days, weeks } from '@/content/days';
import { memes } from '@/content/memes';
import { DayBlock } from '@/components/DayBlock';

export function Domains() { return <>
<section id="domains" className="chapter container" aria-labelledby="domains-title"><div className="chapter-label"><span>OCT 27 – NOV 01</span><span>THREE DOMAINS LATER</span></div><h2 id="domains-title">THE DOMAIN WARS</h2><div className="domain-windows">{[{url:'poteto.com',image:'site-poteto-com',text:'A potato. Three million views.'},{url:'thibaultsottiaux.com',image:'site-thibaultsottiaux-com',text:"Registered by Alexandr Wang. Redirects to Meta’s Muse."},{url:'tibo.dog',image:'site-tibo-dog-title',text:'$5.99. Domain acquired.'}].map(d=><figure className="browser-window" key={d.url}><div className="browser-chrome"><span aria-hidden="true">● ● ●</span><a href={`https://${d.url}`} target="_blank" rel="noopener noreferrer">{d.url} ↗</a></div><img src={`/images/${d.image}.webp`} width="1400" height="802" alt={`Captured website: ${d.url}. ${d.text}`} loading="lazy"/><figcaption>{d.text}</figcaption></figure>)}</div><div className="domain-posts"><PostCard id="domain"/><PostCard id="afford"/><PostCard id="views"/><PostCard id="popular"/></div><p className="caption">A THIRD PARTY HAS ENTERED THE CHAT.</p></section>
</>; }
