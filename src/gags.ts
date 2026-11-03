import { gsap, ScrollTrigger } from './motion';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
export const formatCount = (value: number) => Math.round(value).toLocaleString('en-US');

export function initGags(finalPress: () => void) {
  gsap.utils.toArray<HTMLElement>('[data-stamp-scene]').forEach(scene => {
    const items = scene.querySelectorAll('li');
    const checks = scene.querySelectorAll('.ship-check');
    const stamp = scene.querySelector('.stamp');
    const timeline = gsap.timeline({ scrollTrigger: { trigger: scene, start: 'top 78%', once: true } });
    timeline.from(items, { y: 12, opacity: 0, stagger: .18, duration: .22 })
      .from(checks, { scale: 0, stagger: .18, duration: .18 }, 0)
      .to({}, { duration: .3 })
      .fromTo(stamp, { scale: 2, rotation: -18, opacity: 0 }, { scale: 1, rotation: -12, opacity: .85, duration: .16, ease: 'power4.in' })
      .to(stamp, { opacity: 1, duration: .08 })
      .call(() => { checks.forEach(check => { check.textContent = '✕'; }); scene.dataset.stamped = 'true'; });
    const caption = scene.querySelector('.stamp-caption');
    if (caption) timeline.from(caption, { y: 8, opacity: 0, duration: .2 });
  });

  const cooking = gsap.timeline({ scrollTrigger: { trigger: '.cooking-change', start: 'top 80%', end: 'top 35%', scrub: .2 } });
  cooking.from('.cooking-change .strike path', { strokeDasharray: 1, strokeDashoffset: 1, duration: .7, ease: 'none' })
    .from('.cooking-typed>span', { autoAlpha: 0, duration: .04, stagger: .045 });

  const graduation = gsap.timeline({ scrollTrigger: { trigger: '.graduation-title', start: 'top 80%', end: 'top 28%', scrub: .2 } });
  graduation.from('.graduation-strike path', { strokeDasharray: 1, strokeDashoffset: 1, duration: .65, ease: 'none' })
    .from('.token-word>span', { autoAlpha: 0, duration: .05, stagger: .1 })
    .from('.type-caret', { opacity: 0, duration: .05 }, '<')
    .from('.callback', { rotationY: -90, opacity: 0, transformOrigin: 'left center', duration: .45 });

  const counters = gsap.utils.toArray<HTMLElement>('.game-stats [data-count-to]');
  counters.forEach((el, i) => {
    const count = { n: 0 }, end = Number(el.dataset.countTo);
    gsap.to(count, { n: end, duration: .85, delay: i * .1, ease: 'power2.out', scrollTrigger: { trigger: '.game-stats', start: 'top 88%', once: true }, onUpdate: () => { el.textContent = formatCount(count.n); } });
  });

  const credits = gsap.timeline({ scrollTrigger: { trigger: '.end-tally', start: 'top 85%', once: true } });
  const rows = gsap.utils.toArray<HTMLElement>('.end-tally [data-count-to]');
  rows.forEach((el, i) => {
    const count = { n: 0 };
    const position = i === rows.length - 1 ? '+=.65' : '+=.08';
    credits.to(count, { n: Number(el.dataset.countTo), duration: .38, ease: 'power2.out', onUpdate: () => { el.textContent = formatCount(count.n); } }, position);
  });
  credits.to({}, { duration: .45 }).call(finalPress);
}

export function initCardFling() {
  const card = document.querySelector<HTMLElement>('.reset-deck img:nth-child(2)')!;
  const counter = document.querySelector<HTMLElement>('.distributed span')!;
  let originX = 0, deltaX = 0, dragging = false, busy = false, distributed = 0;
  function fling(direction: number) {
    if (busy) return;
    distributed++; counter.textContent = String(distributed);
    if (reduced.matches) return;
    busy = true;
    const tl = gsap.timeline({ onComplete: () => { busy = false; } });
    tl.to(card, { x: direction * 450, y: -110, rotation: direction * 38, opacity: 0, duration: .35, ease: 'power2.in' })
      .set(card, { x: 0, y: 60, rotation: 0, opacity: 0 })
      .to(card, { y: 0, opacity: 1, duration: .3, ease: 'power3.out' });
  }
  card.addEventListener('pointerdown', event => {
    if (busy) return;
    originX = event.clientX; deltaX = 0; dragging = true; card.setPointerCapture(event.pointerId);
  });
  card.addEventListener('pointermove', event => {
    if (!dragging || reduced.matches) return;
    deltaX = event.clientX - originX;
    gsap.set(card, { x: deltaX, rotation: deltaX / 18 });
  });
  card.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(deltaX) > 55) fling(Math.sign(deltaX));
    else gsap.to(card, { x: 0, rotation: 0, duration: reduced.matches ? 0 : .2 });
  });
  card.addEventListener('pointercancel', () => { dragging = false; gsap.set(card, { x: 0, rotation: 0 }); });
  document.querySelector('.deal-card')!.addEventListener('click', () => fling(distributed % 2 ? -1 : 1));
}
