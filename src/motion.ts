import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initGags, formatCount, initCardFling } from './gags';
import { initPolishMotion, initDisclosures, initDomainDots } from './polish';

gsap.registerPlugin(ScrollTrigger);
let context: gsap.Context | undefined;
let lenis: Lenis | undefined;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const q = <T extends HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!;

export function scrollToStory(target: string, immediate = false) {
  if (lenis && !reduced.matches) lenis.scrollTo(target, { duration: 0.85, immediate, offset: target.startsWith('#day-') ? -24 : 0 });
  else
    q(target)?.scrollIntoView({
      behavior: reduced.matches || immediate ? 'instant' : 'smooth',
    });
}

function cartoonSequence() {
  const scene = q('.cartoon-scroll');
  const frames = gsap.utils.toArray<HTMLElement>('.cartoon-frame');
  gsap.set('.cartoon-art', { x: 0, y: 0, xPercent: -50, yPercent: -50 });
  gsap.set(frames, { autoAlpha: 0, y: 22 });
  gsap.set('.hype-bar, .quality-bar', { scaleY: 0, transformOrigin: 'bottom' });
  gsap.set('.bar-chart span', { scale: .7, autoAlpha: 0 });
  const clock = { n: 0 };
  const timeline = gsap.timeline({
    onUpdate: () => {
      frames.forEach((frame) => {
        const hidden = Number(gsap.getProperty(frame, 'opacity')) < .5;
        frame.inert = hidden;
        frame.setAttribute('aria-hidden', String(hidden));
      });
    },
    scrollTrigger: {
      id: 'cartoon',
      trigger: scene,
      start: 'top top',
      end: 'bottom bottom',
      pin: '.cartoon-stage',
      pinSpacing: true,
      scrub: 0.25,
      invalidateOnRefresh: true,
    },
  });
  timeline
    .to(
      '.cartoon-art',
      {
        top: '3%',
        yPercent: 0,
        scale: 0.74,
        duration: 1.2,
        ease: 'power2.inOut',
      },
      0,
    )
    .to(frames[0], { autoAlpha: 1, y: 0, duration: 0.35 }, 1.2)
    .to({}, { duration: 0.7 })
    .to(frames[0], { autoAlpha: 0, y: -15, duration: 0.2 })
    .to(frames[1], { autoAlpha: 1, y: 0, duration: 0.2 })
    .to(clock, {
      n: 34,
      duration: 1,
      ease: 'none',
      onUpdate: () => {
        q('.clock-value').textContent =
          '+00:' + String(Math.round(clock.n)).padStart(2, '0');
      },
    })
    .to(frames[1], { autoAlpha: 0, duration: 0.15 })
    .fromTo(
      frames[2],
      { scale: 1.15, rotation: 2, y: 35 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.25,
        ease: 'power4.out',
      },
    )
    .to('.cartoon-stage', { x: 4, duration: 0.035 })
    .to('.cartoon-stage', { x: -4, duration: 0.035 })
    .to('.cartoon-stage', { x: 0, duration: 0.035 })
    .to({}, { duration: 1 })
    .to(frames[2], { autoAlpha: 0, duration: 0.2 })
    .to(frames[3], { autoAlpha: 1, y: 0, duration: 0.25 })
    .to({}, { duration: 0.8 })
    .to(frames[3], { autoAlpha: 0, duration: 0.2 })
    .to(frames[4], { autoAlpha: 1, y: 0, duration: 0.25 })
    .to('.hype-bar', {
      scaleY: 1,
      transformOrigin: 'bottom',
      duration: 0.7,
      ease: 'power2.out',
    })
    .to('.quality-bar', {
      scaleY: 1,
      transformOrigin: 'bottom',
      duration: 0.3,
    })
    .to('.bar-chart span', { scale: 1, autoAlpha: 1, duration: 0.15 })
    .to({}, { duration: 0.7 });
}

function prequelThread() {
  const thread = gsap.timeline({
    scrollTrigger: { trigger: '.chat-thread', start: 'top 90%', once: true },
  });
  gsap.utils.toArray<HTMLElement>('.chat-reply').forEach((reply, i) => {
    const text = reply.querySelector('.chat-text');
    const typing = reply.querySelector('.typing');
    gsap.set(text, { opacity: 0 });
    gsap.set(typing, { display: 'inline-flex', opacity: 0 });
    thread
      .to(typing, { opacity: 1, duration: 0.05 })
      .to({}, { duration: 0.4 })
      .set(typing, { display: 'none' })
      .to(text, { opacity: 1, duration: 0.12 });
  });
}

export function initMotion(finalPress: () => void) {
  context?.revert();
  lenis?.destroy();
  lenis = undefined;
  document.documentElement.classList.toggle('reduced-motion', reduced.matches);
  document.documentElement.classList.toggle('motion-ready', !reduced.matches);
  document.querySelectorAll<HTMLElement>('.cartoon-frame').forEach((frame) => {
    frame.inert = false;
    frame.removeAttribute('aria-hidden');
  });
  document.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
    el.textContent = formatCount(Number(el.dataset.countTo));
  });
  document.querySelectorAll('[data-stamp-scene]').forEach((scene) => {
    delete (scene as HTMLElement).dataset.stamped;
    scene.querySelectorAll('.ship-check').forEach((check) => {
      check.textContent = '✓';
    });
  });
  if (reduced.matches) return;
  context = gsap.context(() => {
    cartoonSequence();
    prequelThread();
    initGags(finalPress);
    initPolishMotion();
  });
  if (matchMedia('(pointer: fine)').matches)
    lenis = new Lenis({ autoRaf: true, duration: 0.85, anchors: true });
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };

let interactionsReady = false;
export function initInteractions() {
  if (interactionsReady) return;
  interactionsReady = true;
  initCardFling(); initDisclosures(); initDomainDots();
}
