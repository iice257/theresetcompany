'use client';
import { useEffect } from 'react';

export function Motion(){
  useEffect(()=>{
    let cleanup: (()=>void)|undefined, disposed=false;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const start=async()=>{
      cleanup?.();cleanup=undefined;
      if(media.matches)return;
      const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);
      if(disposed||media.matches)return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx=gsap.context(()=>{
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:18,duration:.55,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
        gsap.utils.toArray<HTMLElement>('.stamp').forEach(el=>gsap.from(el,{scale:1.4,rotation:-18,opacity:0,duration:.22,scrollTrigger:{trigger:el,start:'top 75%',once:true}}));
        gsap.to('.reset-deck img:first-child',{rotation:-13,x:-36,scrollTrigger:{trigger:'.reset-deck',start:'top 90%',end:'center center',scrub:true}});
        gsap.to('.reset-deck img:last-child',{rotation:12,x:36,scrollTrigger:{trigger:'.reset-deck',start:'top 90%',end:'center center',scrub:true}});
        gsap.from('.token-word',{y:30,opacity:0,scrollTrigger:{trigger:'.graduation-title',start:'top 70%',end:'center center',scrub:true}});
        gsap.from('.cooking-change',{opacity:.15,scrollTrigger:{trigger:'.cooking-change',start:'top 80%',end:'top 45%',scrub:true}});
        if(innerWidth>=900){
          ScrollTrigger.create({trigger:'.cartoon-layout',start:'top 100px',end:'bottom bottom',pin:'.cartoon-art',pinSpacing:false});
          gsap.from('.browser-window',{y:60,rotation:i=>i===1?3:-2,stagger:.1,scrollTrigger:{trigger:'.domain-windows',start:'top 85%',end:'center center',scrub:true}});
        }
        const clock={n:0};gsap.to(clock,{n:34,roundProps:'n',scrollTrigger:{trigger:'.challenge-sequence',start:'top 85%',end:'center 45%',scrub:true},onUpdate:()=>{const el=document.querySelector('.clock-value');if(el)el.textContent=`+00:${String(clock.n).padStart(2,'0')}`;}});
      });
      let lenis: {destroy:()=>void}|undefined;
      if(matchMedia('(pointer: fine)').matches){const {default:Lenis}=await import('lenis');if(!disposed&&!media.matches)lenis=new Lenis({autoRaf:true,duration:.85,anchors:true});}
      cleanup=()=>{ctx.revert();lenis?.destroy();};
      if(disposed)cleanup();
    };
    void start();media.addEventListener('change',start);
    return()=>{disposed=true;media.removeEventListener('change',start);cleanup?.();};
  },[]);
  return null;
}
