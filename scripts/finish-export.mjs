import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
// Preserve Next's rendered HTML and metadata; this static editorial needs no router.
function finish(dir){for(const file of readdirSync(dir)){const p=join(dir,file);if(statSync(p).isDirectory())finish(p);else if(file.endsWith('.html')){let html=readFileSync(p,'utf8');html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link\b[^>]*(?:as="script"|rel="modulepreload")[^>]*>/g,'');if(file==='index.html'&&dir==='out')html=html.replace('</body>','<script src="/story.js" defer></script></body>');writeFileSync(p,html);}}}
finish('out');
