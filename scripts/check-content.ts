import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
const days = readFileSync('src/content/days.ts', 'utf8');
const posts = readFileSync('src/content/posts.ts', 'utf8');
const shipMatch = days
  .match(/new Set\(\[([^\]]+)\]/)![1]
  .split(',')
  .map(Number)
  .filter((value) => value > 0);
assert.equal(shipMatch.length, 15);
assert.equal(28 - shipMatch.length, 13);
assert(!shipMatch.includes(27) && !shipMatch.includes(28));
const ids = [...days.matchAll(/'(\d{19})'/g)].map((m) => m[1]);
assert.equal(ids.length, 28);
assert.equal(new Set(ids).size, 28);
for (const file of readdirSync('public/images'))
  if (file.endsWith('.webp'))
    assert(
      statSync(resolve('public/images', file)).size < 200 * 1024,
      `${file} exceeds image budget`,
    );
assert(statSync('public/images/button-up.webp').size < 120 * 1024);
assert(statSync('public/images/button-down.webp').size < 120 * 1024);
assert(!posts.includes('Shipped before the coffee cooled'));
assert(!posts.includes('something questionable'));
const html = readFileSync('out/index.html', 'utf8');
assert.equal(
  (html.match(/<script\b/g) || []).length,
  1,
  'Static export must load one enhancement script',
);
assert(html.includes('src="/story.js"'));
assert(!html.includes('self.__next_f'));
assert(!html.includes('EXCERPT'), 'Receipt cards must not include the old EXCERPT label');
assert.equal((html.match(/data-day="\d+"/g) || []).length, 28);
const runtimeFiles = ['public/story.js', ...readdirSync('public/motion').filter(file => file.endsWith('.js')).map(file => resolve('public/motion', file))];
assert(
  runtimeFiles.reduce((sum, file) => sum + gzipSync(readFileSync(file)).length, 0) <= 150 * 1024,
  'Full browser JS exceeds 150KB gzip',
);
console.log(
  'PASS: 28 unique day links, 15 ships / 13 resets, two banked resets, image budgets and placeholder sweep.',
);
