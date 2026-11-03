import { gsap, ScrollTrigger } from './motion';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

export function initPolishMotion() {
  gsap.utils.toArray<HTMLElement>('.week').forEach((week) => {
    gsap.fromTo(
      week.querySelector('.week-title'),
      { color: 'transparent' },
      {
        color: '#141414',
        ease: 'none',
        scrollTrigger: {
          trigger: week.querySelector('.week-title'),
          start: 'top 88%',
          end: 'center 48%',
          scrub: true,
        },
      },
    );
    gsap.from(week.querySelector('.week-caption'), {
      x: 65,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: week.querySelector('.week-title'),
        start: 'top 80%',
        once: true,
      },
    });
  });
  if (matchMedia('(min-width: 701px)').matches) {
    const parent = document.querySelector<HTMLElement>('.domain-windows')!;
    gsap.from('.browser-window', {
      x: (_, el: HTMLElement) =>
        parent.clientWidth / 2 - el.offsetLeft - el.clientWidth / 2,
      y: (i) => i * 15,
      rotation: (i) => (i - 1) * 7,
      scale: 0.91,
      stagger: 0.04,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: parent,
        start: 'top 95%',
        end: 'center 46%',
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });
  }
}

export function initDisclosures() {
  document
    .querySelectorAll<HTMLDetailsElement>('details')
    .forEach((details) => {
      const summary = details.querySelector<HTMLElement>('summary')!;
      let animation: Animation | undefined,
        expanded = details.open;
      summary.addEventListener('click', (event) => {
        if (reduced.matches) return;
        event.preventDefault();
        const start = details.getBoundingClientRect().height;
        animation?.cancel();
        expanded = !expanded;
        details.style.overflow = 'hidden';
        details.open = true;
        const end = expanded
          ? details.scrollHeight
          : summary.getBoundingClientRect().height;
        animation = details.animate(
          [{ height: start + 'px' }, { height: end + 'px' }],
          { duration: 280, easing: 'cubic-bezier(.2,.8,.2,1)' },
        );
        animation.onfinish = () => {
          details.open = expanded;
          details.style.overflow = '';
          animation = undefined;
          ScrollTrigger.refresh();
        };
      });
    });
}

export function initDomainDots() {
  const rail = document.querySelector<HTMLElement>('.domain-windows')!;
  const windows = Array.from(
    rail.querySelectorAll<HTMLElement>('.browser-window'),
  );
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('.snap-dots button'),
  );
  buttons.forEach((button, i) =>
    button.addEventListener('click', () => {
      rail.scrollTo({
        left: windows[i].offsetLeft - rail.offsetLeft - 16,
        behavior: reduced.matches ? 'instant' : 'smooth',
      });
    }),
  );
  rail.addEventListener(
    'scroll',
    () => {
      const active = Math.round(
        rail.scrollLeft / (windows[0].clientWidth + 16),
      );
      buttons.forEach((button, i) =>
        button.setAttribute('aria-pressed', String(i === active)),
      );
    },
    { passive: true },
  );
}
