'use client';
import { useEffect, useRef, useState } from 'react';
import { days } from '@/content/days';
import { SITE_URL } from '@/content/site';

export function StoryControls() {
  const [muted,setMuted]=useState(true);
  const [pressed,setPressed]=useState(false);
  const [egg,setEgg]=useState(false);
  const [current,setCurrent]=useState(0);
  const [visible,setVisible]=useState(false);
  const presses=useRef(0);
  const audio=useRef<AudioContext|null>(null);
  const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const ships=days.slice(0,current).filter(d=>d.type==='ship').length;
  function press() {
    setPressed(true);clearTimeout(timer.current);timer.current=setTimeout(()=>setPressed(false),120);
    if(!muted) {
      audio.current ??= new AudioContext();
      const ctx=audio.current;void ctx.resume();
      const osc=ctx.createOscillator(), gain=ctx.createGain();
      osc.frequency.setValueAtTime(130,ctx.currentTime);osc.frequency.exponentialRampToValueAtTime(45,ctx.currentTime+.09);
      gain.gain.setValueAtTime(.2,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.12);
      osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.12);
    }
    navigator.vibrate?.(12);
    presses.current++;
    if(presses.current>=10){setEgg(true);return;}
    document.getElementById('prequel')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  useEffect(()=>{
    let raf=0;
    const update=()=>{
      const blocks=Array.from(document.querySelectorAll<HTMLElement>('[data-day]'));
      const center=innerHeight*.5;
      let day=0;
      for(const block of blocks) if(block.getBoundingClientRect().top<=center) day=Number(block.dataset.day);
      setCurrent(day);
      const first=blocks[0],last=blocks.at(-1);
      setVisible(!!first&&!!last&&first.getBoundingClientRect().top<innerHeight&&last.getBoundingClientRect().bottom>0);
      raf=0;
    };
    const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};
    addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);update();
    return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(raf);clearTimeout(timer.current);void audio.current?.close();};
  },[]);
  useEffect(()=>{
    if(!current||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const reset=days[current-1].type==='reset';
    if(reset) document.getElementById('story')?.animate([{transform:'translateX(0)'},{transform:'translateX(2px)'},{transform:'translateX(-2px)'},{transform:'translateX(0)'}],{duration:140});
  },[current]);
  return <>
    <div className="hero-control"><button className={`reset-object ${pressed?'is-pressed':''}`} aria-label="Press reset and start the story" onClick={press}>
      <img src="/images/button-up.webp" alt="" width="520" height="532" fetchPriority="high" /><img className="button-down" src="/images/button-down.webp" alt="" width="520" height="532" />
    </button><button className="press-label" onClick={press}>PRESS TO SCROLL <span aria-hidden="true">⌄</span></button></div>
    <button className="sound-toggle mono" aria-pressed={!muted} onClick={()=>setMuted(m=>!m)}>SOUND {muted?'OFF':'ON'} <span aria-hidden="true">{muted?'○':'◉'}</span></button>
    <aside className={`hud ${visible?'hud--visible':''} ${current&&days[current-1].type==='reset'?'hud--reset':'hud--ship'}`} aria-label="Sprint progress" aria-hidden={!visible} inert={!visible}>
      <img key={current} src={`/images/button-${current&&days[current-1].type==='reset'?'down':'up'}.webp`} width="52" height="54" alt="" />
      <div className="mono"><span>DAY {String(current||1).padStart(2,'0')} / 28</span><div className="hud-counts"><span>SHIPS <b key={`s${ships}`}>{ships}</b></span><span>RESETS <b key={`r${current-ships}`}>{current-ships}</b></span></div></div>
    </aside>
    {egg&&<div className="egg" role="dialog" aria-modal="true" aria-label="Your unofficial reset card"><button className="egg-close mono" onClick={()=>setEgg(false)} autoFocus>CLOSE ×</button><p>“People have escaped the TL and are asking me for resets on the street now.”</p><span className="mono">— @thsottiaux</span><img src="/images/reset-card.webp" width="800" height="492" alt="One full reset. Unofficial. Not redeemable." /><button className="text-link" onClick={()=>{setEgg(false);document.getElementById('street')?.scrollIntoView();}}>RESETS ON THE STREET ↗</button></div>}
  </>;
}

export function ShareControls(){
  const [copied,setCopied]=useState(false);
  const [failed,setFailed]=useState(false);
  return <div className="share-controls"><a className="solid-link" target="_blank" rel="noopener noreferrer" href={`https://x.com/intent/post?text=${encodeURIComponent('The Reset Company — 28 days of ships, resets and one potato. @thsottiaux @poteto')}&url=${encodeURIComponent(SITE_URL)}`}>SHARE ON X ↗</a><button className="outline-link" onClick={async()=>{try{await navigator.clipboard.writeText(SITE_URL);setCopied(true);setTimeout(()=>setCopied(false),2500);}catch{setFailed(true);}}}>{copied?'LINK COPIED ✓':'COPY LINK ↗'}</button><span className="sr-only" role="status">{copied?'Link copied':''}</span>{failed&&<input aria-label="Select and copy the site link" readOnly value={SITE_URL} onFocus={e=>e.target.select()} />}</div>;
}
