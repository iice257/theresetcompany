import { build } from 'esbuild';
await build({entryPoints:['src/browser.ts'],outfile:'public/story.js',bundle:true,minify:true,target:['es2020'],format:'iife',legalComments:'none'});
