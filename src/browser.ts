import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { inject } from '@vercel/analytics';
import { SITE_URL } from './content/site';
import { days } from './content/days';
const q=<T extends HTMLElement>(s:string)=>document.querySelector<T>(s)!;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let muted=true,presses=0,audio:AudioContext|undefined,pressTimer:ReturnType<typeof setTimeout>;
const reset=q<HTMLButtonElement>('.reset-object'),egg=q<HTMLDialogElement>('.egg'),sound=q<HTMLButtonElement>('.sound-toggle');
function press(){
 reset.classList.add('is-pressed');clearTimeout(pressTimer);pressTimer=setTimeout(()=>reset.classList.remove('is-pressed'),120);
 if(!muted){audio??=new AudioContext();void audio.resume();const osc=audio.createOscillator(),gain=audio.createGain();osc.frequency.setValueAtTime(130,audio.currentTime);osc.frequency.exponentialRampToValueAtTime(45,audio.currentTime+.09);gain.gain.setValueAtTime(.2,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.12);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(audio.currentTime+.12);}
 navigator.vibrate?.(12);if(++presses>=10){egg.showModal();return;}
 if(lenis&&!reduced.matches)lenis.scrollTo('#prequel',{duration:.85});
 else q('#prequel').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
}
reset.addEventListener('click',press);q('.press-label').addEventListener('click',press);
sound.addEventListener('click',()=>{muted=!muted;sound.setAttribute('aria-pressed',String(!muted));sound.innerHTML=`SOUND ${muted?'OFF':'ON'} <span aria-hidden="true">${muted?'○':'◉'}</span>`;});
q('.egg-close').addEventListener('click',()=>egg.close());q('.egg .text-link').addEventListener('click',()=>egg.close());
q('.copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(SITE_URL);q('.copy-link').textContent='LINK COPIED ✓';q('.copy-status').textContent='Link copied';setTimeout(()=>{q('.copy-link').textContent='COPY LINK ↗';q('.copy-status').textContent='';},2500);}catch{const input=q<HTMLInputElement>('.copy-fallback');input.hidden=false;input.focus();input.select();}});
const blocks=Array.from(document.querySelectorAll<HTMLElement>('[data-day]'));
const shipDays=new Set(days.filter(day=>day.type==='ship').map(day=>day.day));let current=0,raf=0;
function update(){
 let day=0;for(const b of blocks)if(b.getBoundingClientRect().top<=innerHeight*.5)day=Number(b.dataset.day);
 const visible=blocks[0].getBoundingClientRect().top<innerHeight&&blocks[27].getBoundingClientRect().bottom>0,hud=q('.hud');hud.classList.toggle('hud--visible',visible);hud.setAttribute('aria-hidden',String(!visible));hud.inert=!visible;
 if(day!==current){const ships=Array.from(shipDays).filter(d=>d<=day).length;q('.hud-day').textContent=`DAY ${String(day||1).padStart(2,'0')} / 28`;q('.ship-count').textContent=String(ships);q('.reset-count').textContent=String(day-ships);const isReset=day>0&&!shipDays.has(day);hud.classList.toggle('hud--reset',isReset);hud.classList.toggle('hud--ship',!isReset);q<HTMLImageElement>('.hud img').src=`/images/button-${isReset?'down':'up'}.webp`;
 if(!reduced.matches){q(isReset?'.reset-count':'.ship-count').animate([{transform:'translateY(6px)',opacity:.2},{transform:'translateY(0)',opacity:1}],{duration:220});if(isReset)q('#story').animate([{transform:'translateX(0)'},{transform:'translateX(2px)'},{transform:'translateX(-2px)'},{transform:'translateX(0)'}],{duration:140});}current=day;}raf=0;
}
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update);},{passive:true});addEventListener('resize',update);update();
gsap.registerPlugin(ScrollTrigger);let context:gsap.Context|undefined,lenis:Lenis|undefined;
function motion(){
 context?.revert();lenis?.destroy();if(reduced.matches)return;
 context=gsap.context(()=>{
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:18,duration:.55,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
  gsap.utils.toArray<HTMLElement>('.stamp').forEach(el=>gsap.from(el,{scale:1.4,rotation:-18,opacity:0,duration:.22,scrollTrigger:{trigger:el,start:'top 75%',once:true}}));
  gsap.to('.reset-deck img:first-child',{rotation:-13,x:-36,scrollTrigger:{trigger:'.reset-deck',start:'top 90%',end:'center center',scrub:true}});gsap.to('.reset-deck img:last-child',{rotation:12,x:36,scrollTrigger:{trigger:'.reset-deck',start:'top 90%',end:'center center',scrub:true}});
  gsap.from('.token-word',{y:30,opacity:0,scrollTrigger:{trigger:'.graduation-title',start:'top 70%',end:'center center',scrub:true}});gsap.from('.cooking-change',{opacity:.15,scrollTrigger:{trigger:'.cooking-change',start:'top 80%',end:'top 45%',scrub:true}});
  if(innerWidth>=900){ScrollTrigger.create({trigger:'.cartoon-layout',start:'top 100px',end:'bottom bottom',pin:'.cartoon-art',pinSpacing:false});gsap.from('.browser-window',{y:60,rotation:i=>i===1?3:-2,stagger:.1,scrollTrigger:{trigger:'.domain-windows',start:'top 85%',end:'center center',scrub:true}});}
  const clock={n:0};gsap.to(clock,{n:34,roundProps:'n',scrollTrigger:{trigger:'.challenge-sequence',start:'top 85%',end:'center 45%',scrub:true},onUpdate:()=>{q('.clock-value').textContent=`+00:${String(clock.n).padStart(2,'0')}`;}});
 });if(matchMedia('(pointer: fine)').matches)lenis=new Lenis({autoRaf:true,duration:.85,anchors:true});
 ScrollTrigger.refresh();
}
// All text is already visible. Initialize choreography after the reader moves.
let started=false;
function begin(){if(started)return;started=true;motion();}
addEventListener('pointerdown',begin,{once:true,passive:true});
addEventListener('keydown',begin,{once:true});
addEventListener('wheel',begin,{once:true,passive:true});
addEventListener('scroll',begin,{once:true,passive:true});
reduced.addEventListener('change',()=>{if(started)motion();});
const card=q('.reset-deck img:nth-child(2)');let origin=0;
card.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&!reduced.matches){origin=e.clientX;card.setPointerCapture(e.pointerId);}});card.addEventListener('pointerup',e=>{if(origin){const delta=e.clientX-origin;if(Math.abs(delta)>70)card.animate([{transform:'translateX(0)'},{transform:`translateX(${delta*2}px) rotate(${delta/12}deg)`,opacity:0},{transform:'translateX(0)',opacity:1}],{duration:650});origin=0;}});
if(location.hostname!=='127.0.0.1'&&location.hostname!=='localhost')inject({mode:'production'});
