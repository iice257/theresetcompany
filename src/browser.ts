import { inject } from '@vercel/analytics';
import { SITE_URL } from './content/site';
import { days } from './content/days';
import { initMotion, scrollToStory } from './motion';
import { initCardFling } from './gags';
import { initDisclosures, initDomainDots } from './polish';

const q = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let muted = true, presses = 0, audio: AudioContext | undefined;
let pressTimer: ReturnType<typeof setTimeout>;
const reset = q<HTMLButtonElement>('.reset-object');
const egg = q<HTMLDialogElement>('.egg');
const sound = q<HTMLButtonElement>('.sound-toggle');

export function thunk() {
  if (muted || !audio) return;
  void audio.resume();
  const osc = audio.createOscillator(), gain = audio.createGain();
  osc.frequency.setValueAtTime(130, audio.currentTime);
  osc.frequency.exponentialRampToValueAtTime(45, audio.currentTime + .09);
  gain.gain.setValueAtTime(.2, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .12);
  osc.connect(gain); gain.connect(audio.destination); osc.start(); osc.stop(audio.currentTime + .12);
}
function press() {
  reset.classList.add('is-pressed');
  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => reset.classList.remove('is-pressed'), 120);
  if (!muted) { audio ??= new AudioContext(); thunk(); }
  navigator.vibrate?.(12);
  if (++presses >= 10) { egg.showModal(); return; }
  scrollToStory('#prequel');
}
reset.addEventListener('click', press);
q('.press-label').addEventListener('click', press);
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
    q('.copy-link').textContent = 'LINK COPIED ✓'; q('.copy-status').textContent = 'Link copied';
    setTimeout(() => { q('.copy-link').textContent = 'COPY LINK ↗'; q('.copy-status').textContent = ''; }, 2500);
  } catch { const input = q<HTMLInputElement>('.copy-fallback'); input.hidden = false; input.focus(); input.select(); }
});

const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-day]'));
const shipDays = new Set(days.filter(day => day.type === 'ship').map(day => day.day));
let current = 0, raf = 0;
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
  for (const block of blocks) if (block.getBoundingClientRect().top <= innerHeight * .5) day = Number(block.dataset.day);
  const visible = blocks[0].getBoundingClientRect().top < innerHeight * .75 && blocks[27].getBoundingClientRect().bottom > 0;
  const hud = q('.hud'); hud.classList.toggle('hud--visible', visible);
  hud.setAttribute('aria-hidden', String(!visible)); hud.inert = !visible;
  if (day !== current) {
    const ships = Array.from(shipDays).filter(d => d <= day).length;
    roll('.day-count', day || 1); roll('.ship-count', ships); roll('.reset-count', day - ships);
    const isReset = day > 0 && !shipDays.has(day);
    hud.classList.toggle('hud--reset', isReset); hud.classList.toggle('hud--ship', !isReset);
    q<HTMLImageElement>('.hud img').src = `/images/button-${isReset ? 'down' : 'up'}.webp`;
    if (!reduced.matches) {
      q(isReset ? '.reset-count' : '.ship-count').animate([{ background: isReset ? '#e8261c' : '#d9a441' }, { background: 'transparent' }], { duration: 350 });
      if (isReset) q('#story').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' }], { duration: 140 });
    }
    current = day;
  }
  raf = 0;
}
addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
addEventListener('resize', update);
q('.hud-button').addEventListener('click', () => {
  const next = days.find(day => day.day > current && day.type === 'reset');
  scrollToStory('#day-' + (next?.day ?? 2));
});
update();

let started = false;
let finalPlayed = false;
function finalPress() {
  if (finalPlayed || reduced.matches) return;
  finalPlayed = true;
  const lastReset = q('.credits-reset');
  lastReset.classList.add('is-pressed'); reset.classList.add('is-pressed'); thunk();
  lastReset.dataset.pressed = 'true';
  setTimeout(() => { lastReset.classList.remove('is-pressed'); reset.classList.remove('is-pressed'); }, 280);
}
function begin() { if (started) return; started = true; initMotion(finalPress); }
addEventListener('pointerdown', begin, { once: true, passive: true });
addEventListener('keydown', begin, { once: true });
addEventListener('wheel', begin, { once: true, passive: true });
addEventListener('scroll', begin, { once: true, passive: true });
reduced.addEventListener('change', () => { if (started) initMotion(finalPress); });
initCardFling();
initDisclosures();
initDomainDots();
if (location.hostname !== '127.0.0.1' && location.hostname !== 'localhost') inject({ mode: 'production' });
