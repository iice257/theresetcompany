import { inject } from '@vercel/analytics';
import { SITE_URL } from './content/site';
import { days } from './content/days';
let motion: typeof import('./motion') | undefined;
let initialization: Promise<void> | undefined;

const q = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let muted = true,
  presses = 0,
  audio: AudioContext | undefined;
const reset = q<HTMLButtonElement>('.reset-object');
const egg = q<HTMLDialogElement>('.egg');
const sound = q<HTMLButtonElement>('.sound-toggle');
let heroHeld = false;
let automaticPress = false;

function showHeroHeld(held: boolean) {
  heroHeld = held;
  reset.classList.toggle('is-pressed', held || automaticPress);
}

function bindReleaseButton(
  button: HTMLButtonElement,
  showHeld: (held: boolean) => void,
  activate: () => void | Promise<void>,
) {
  let pointer: number | undefined;
  let key: string | undefined;
  const cancel = () => {
    if (pointer === undefined && !key) return;
    pointer = undefined;
    key = undefined;
    showHeld(false);
  };
  button.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || pointer !== undefined || key) return;
    pointer = event.pointerId;
    button.setPointerCapture(pointer);
    showHeld(true);
  });
  button.addEventListener('pointerup', (event) => {
    if (event.pointerId !== pointer) return;
    const bounds = button.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
      && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    cancel();
    if (inside) void activate();
  });
  button.addEventListener('pointercancel', cancel);
  button.addEventListener('lostpointercapture', cancel);
  button.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (event.repeat || pointer !== undefined || key) return;
    key = event.key;
    showHeld(true);
  });
  button.addEventListener('keyup', (event) => {
    if (event.key !== key) return;
    event.preventDefault();
    cancel();
    void activate();
  });
  button.addEventListener('blur', cancel);
  window.addEventListener('blur', cancel);
  // Assistive technology can activate a button without a pointer/key sequence.
  // Ignore the native click following pointerup; that release already acted.
  button.addEventListener('click', (event) => {
    if (event.detail !== 0 || (event instanceof PointerEvent && event.pointerType)) return;
    if (pointer === undefined && !key) void activate();
  });
}

export function thunk() {
  if (muted || !audio) return;
  void audio.resume();
  const osc = audio.createOscillator(),
    gain = audio.createGain();
  osc.frequency.setValueAtTime(130, audio.currentTime);
  osc.frequency.exponentialRampToValueAtTime(45, audio.currentTime + 0.09);
  gain.gain.setValueAtTime(0.2, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 0.12);
}
async function press() {
  if (!muted) {
    audio ??= new AudioContext();
    thunk();
  }
  navigator.vibrate?.(12);
  if (++presses >= 10) {
    egg.showModal();
    return;
  }
  await begin();
  motion!.scrollToStory('#prequel');
}
bindReleaseButton(reset, showHeroHeld, press);
bindReleaseButton(q<HTMLButtonElement>('.press-label'), showHeroHeld, press);
sound.addEventListener('click', () => {
  muted = !muted;
  if (!muted) audio ??= new AudioContext();
  sound.setAttribute('aria-pressed', String(!muted));
  sound.innerHTML = `SOUND ${muted ? 'OFF' : 'ON'} <span aria-hidden="true">${muted ? '○' : '◉'}</span>`;
});
q('.egg-close').addEventListener('click', () => egg.close());
q('.egg .text-link').addEventListener('click', () => egg.close());
q('.copy-link').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    q('.copy-link').textContent = 'LINK COPIED ✓';
    q('.copy-status').textContent = 'Link copied';
    setTimeout(() => {
      q('.copy-link').textContent = 'COPY LINK ↗';
      q('.copy-status').textContent = '';
    }, 2500);
  } catch {
    const input = q<HTMLInputElement>('.copy-fallback');
    input.hidden = false;
    input.focus();
    input.select();
  }
});

const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-day]'));
const shipDays = new Set(
  days.filter((day) => day.type === 'ship').map((day) => day.day),
);
let current = 0,
  raf = 0;
let hudAutomaticPress = false;
let hudReleaseTimer: ReturnType<typeof setTimeout>;
function roll(selector: string, value: number) {
  const counter = q(selector);
  counter.dataset.value = String(value);
  counter.setAttribute('aria-label', String(value));
  counter.querySelectorAll<HTMLElement>('.digit-strip').forEach((strip, i) => {
    strip.style.transform = `translateY(-${Number(String(value).padStart(2, '0')[i]) * 10}%)`;
  });
}
function update() {
  let day = 0;
  for (const block of blocks)
    if (block.getBoundingClientRect().top <= innerHeight * 0.5)
      day = Number(block.dataset.day);
  const visible =
    blocks[0].getBoundingClientRect().top < innerHeight * 0.75 &&
    blocks[27].getBoundingClientRect().bottom > 0;
  const hud = q('.hud');
  hud.classList.toggle('hud--visible', visible);
  hud.setAttribute('aria-hidden', String(!visible));
  hud.inert = !visible;
  if (day !== current) {
    const ships = Array.from(shipDays).filter((d) => d <= day).length;
    roll('.day-count', day || 1);
    roll('.ship-count', ships);
    roll('.reset-count', day - ships);
    const isReset = day > 0 && !shipDays.has(day);
    current = day;
    hud.classList.toggle('hud--reset', isReset);
    hud.classList.toggle('hud--ship', !isReset);
    clearTimeout(hudReleaseTimer);
    hudAutomaticPress = isReset && !reduced.matches;
    showHudHeld(q('.hud-button').classList.contains('is-pressed'));
    if (hudAutomaticPress) hudReleaseTimer = setTimeout(() => {
      hudAutomaticPress = false;
      showHudHeld(q('.hud-button').classList.contains('is-pressed'));
    }, 180);
    if (!reduced.matches) {
      q(isReset ? '.reset-count' : '.ship-count').animate(
        [
          { background: isReset ? '#e8261c' : '#d9a441' },
          { background: 'transparent' },
        ],
        { duration: 350 },
      );
      if (isReset)
        q('.sprint').animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(2px)' },
            { transform: 'translateX(-2px)' },
            { transform: 'translateX(0)' },
          ],
          { duration: 140 },
        );
    }
  }
  raf = 0;
}
addEventListener(
  'scroll',
  () => {
    if (!raf) raf = requestAnimationFrame(update);
  },
  { passive: true },
);
addEventListener('resize', update);
function showHudHeld(held: boolean) {
  q('.hud-button').classList.toggle('is-pressed', held);
  q<HTMLImageElement>('.hud img').src = `/images/button-${held || hudAutomaticPress ? 'down' : 'up'}.webp`;
}
bindReleaseButton(q<HTMLButtonElement>('.hud-button'), showHudHeld, async () => {
  await begin();
  const next = days.find((day) => day.day > current && day.type === 'reset');
  motion!.scrollToStory('#day-' + (next?.day ?? 2), true);
});
// The scoreboard is hidden above the sprint. Read day geometry only after
// scrolling, keeping a forced layout out of the first hero paint.

let finalPlayed = false;
function finalPress() {
  if (finalPlayed || reduced.matches) return;
  finalPlayed = true;
  const lastReset = q('.credits-reset');
  lastReset.classList.add('is-pressed');
  automaticPress = true;
  showHeroHeld(heroHeld);
  thunk();
  lastReset.dataset.pressed = 'true';
  setTimeout(() => {
    lastReset.classList.remove('is-pressed');
    automaticPress = false;
    showHeroHeld(heroHeld);
  }, 280);
}
function begin() {
  return initialization ??= import('./motion').then((module) => {
    motion = module;
    module.initMotion(finalPress);
    module.initInteractions();
  });
}
addEventListener('pointerdown', begin, { once: true, passive: true });
addEventListener('keydown', begin, { once: true });
addEventListener('wheel', begin, { once: true, passive: true });
addEventListener('scroll', begin, { once: true, passive: true });
reduced.addEventListener('change', () => {
  motion?.initMotion(finalPress);
});
if (location.hostname !== '127.0.0.1' && location.hostname !== 'localhost')
  inject({ mode: 'production' });
