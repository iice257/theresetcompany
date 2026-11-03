import { build } from 'esbuild';
import { rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const generatedMotion = resolve('public/motion');
if (dirname(generatedMotion) !== resolve('public')) throw new Error('Unexpected output path');
rmSync(generatedMotion, { recursive: true, force: true });
await build({
  entryPoints: {story: 'src/browser.ts'},
  outdir: 'public',
  chunkNames: 'motion/[name]-[hash]',
  splitting: true,
  bundle: true,
  minify: true,
  target: ['es2020'],
  format: 'esm',
  legalComments: 'none',
});
