import { gsap, ScrollTrigger } from './motion';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
export const formatCount = (value: number) =>
  Math.round(value).toLocaleString('en-US');

export function initGags(finalPress: () => void) {
  gsap.utils.toArray<HTMLElement>('[data-stamp-scene]').forEach((scene) => {
    const items = scene.querySelectorAll('li');
    const checks = scene.querySelectorAll('.ship-check');
    const stamp = scene.querySelector('.stamp');
    gsap.set(stamp, { autoAlpha: 0 });
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: scene, start: 'top 78%', once: true },
    });
    timeline
      .from(items, { y: 12, opacity: 0, stagger: 0.18, duration: 0.22 })
      .from(checks, { scale: 0, stagger: 0.18, duration: 0.18 }, 0)
      .to({}, { duration: 0.3 })
      .fromTo(
        stamp,
        { scale: 2, rotation: -18, autoAlpha: 0 },
        {
          scale: 1,
          rotation: -12,
          autoAlpha: 0.85,
          duration: 0.16,
          ease: 'power4.in',
        },
      )
      .to(stamp, { autoAlpha: 1, duration: 0.08 })
      .call(() => {
        checks.forEach((check) => {
          check.textContent = '✕';
        });
        scene.dataset.stamped = 'true';
      });
    const caption = scene.querySelector('.stamp-caption');
    if (caption) timeline.from(caption, { y: 8, opacity: 0, duration: 0.2 });
  });

  gsap.set('.cooking-change .strike path, .graduation-strike path', { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set('.cooking-typed>span, .token-word>span, .type-caret', { autoAlpha: 0 });
  gsap.set('.callback', { rotationY: -90, autoAlpha: 0, transformOrigin: 'left center' });
  const cooking = gsap.timeline({
    scrollTrigger: {
      trigger: '.cooking-change',
      start: 'top 80%',
      end: 'top 35%',
      scrub: 0.2,
    },
  });
  cooking
    .to('.cooking-change .strike path', {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'none',
    })
    .to('.cooking-typed>span', {
      autoAlpha: 1,
      duration: 0.04,
      stagger: 0.045,
    });

  const graduation = gsap.timeline({
    scrollTrigger: {
      trigger: '.graduation-title',
      start: 'top 80%',
      end: 'top 28%',
      scrub: 0.2,
    },
  });
  graduation
    .to('.graduation-strike path', {
      strokeDashoffset: 0,
      duration: 0.65,
      ease: 'none',
    })
    .to('.token-word>span', { autoAlpha: 1, duration: 0.05, stagger: 0.1 })
    .to('.type-caret', { autoAlpha: 1, duration: 0.05 }, '<')
    .to('.callback', {
      rotationY: 0,
      autoAlpha: 1,
      transformOrigin: 'left center',
      duration: 0.45,
    });

  const counters = gsap.utils.toArray<HTMLElement>(
    '.game-stats [data-count-to]',
  );
  counters.forEach((el, i) => {
    const count = { n: 0 },
      end = Number(el.dataset.countTo);
    gsap.to(count, {
      n: end,
      duration: 0.85,
      delay: i * 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.game-stats', start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = formatCount(count.n);
      },
    });
  });

  const credits = gsap.timeline({
    scrollTrigger: { trigger: '.end-tally', start: 'top 85%', once: true },
  });
  const rows = gsap.utils.toArray<HTMLElement>('.end-tally [data-count-to]');
  rows.slice(0, -1).forEach((el) => {
    const count = { n: 0 };
    credits.to(
      count,
      {
        n: Number(el.dataset.countTo),
        duration: 0.38,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = formatCount(count.n);
        },
      },
      '+=.08',
    );
  });
  const potato = rows.at(-1)!;
  const lastCount = { n: 0 };
  gsap.timeline({ scrollTrigger: { trigger: potato.parentElement, start: 'top 88%', once: true } })
    .to({}, { duration: .65 })
    .to(lastCount, { n: 1, duration: .38, onUpdate: () => { potato.textContent = formatCount(lastCount.n); } })
    .to({}, { duration: .45 }).call(finalPress);
}

export function initCardFling() {
  const card = document.querySelector<HTMLElement>(
    '.reset-deck img:nth-child(2)',
  )!;
  const counter = document.querySelector<HTMLElement>('.distributed span')!;
  let originX = 0,
    deltaX = 0,
    dragging = false,
    busy = false,
    distributed = 0;
  function fling(direction: number) {
    if (busy) return;
    distributed++;
    counter.textContent = String(distributed);
    if (reduced.matches) return;
    busy = true;
    const tl = gsap.timeline({
      onComplete: () => {
        busy = false;
      },
    });
    tl.to(card, {
      x: direction * 450,
      y: -110,
      rotation: direction * 38,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    })
      .set(card, { x: 0, y: 60, rotation: 0, opacity: 0 })
      .to(card, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' });
  }
  card.addEventListener('pointerdown', (event) => {
    if (busy) return;
    originX = event.clientX;
    deltaX = 0;
    dragging = true;
    card.setPointerCapture(event.pointerId);
  });
  card.addEventListener('pointermove', (event) => {
    if (!dragging || reduced.matches) return;
    deltaX = event.clientX - originX;
    gsap.set(card, { x: deltaX, rotation: deltaX / 18 });
  });
  card.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(deltaX) > 55) fling(Math.sign(deltaX));
    else
      gsap.to(card, { x: 0, rotation: 0, duration: reduced.matches ? 0 : 0.2 });
  });
  card.addEventListener('pointercancel', () => {
    dragging = false;
    gsap.set(card, { x: 0, rotation: 0 });
  });
  document
    .querySelector('.deal-card')!
    .addEventListener('click', () => fling(distributed % 2 ? -1 : 1));
}
