import { readFile, readdir, access } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
const root = resolve('public');
let checked = 0;
async function walk(dir) {
 for (const entry of await readdir(dir, { withFileTypes: true })) {
  const file = join(dir, entry.name);
  if (entry.isDirectory()) { await walk(file); continue; }
  if (!/\.(html|js|css|webmanifest)$/.test(file)) continue;
  const text = await readFile(file, 'utf8');
  const refs = [...text.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m => m[1]);
  if (file.endsWith('.js')) refs.push(...[...text.matchAll(/["'](\.\/[^"']+\.js)["']/g)].map(m => m[1]));
  if (file.endsWith('.css')) refs.push(...[...text.matchAll(/url\(["']?([^\s)"']+)/g)].map(m => m[1]));
  for (const ref of refs) {
   if (/^(https?:|data:|#)/.test(ref) || ref.includes('${')) continue;
   const target = ref.startsWith('/') ? join(root, ref) : resolve(dirname(file), ref);
   await access(target); checked++;
  }
 }
}
await walk(root);
console.log(`Verified ${checked} local asset references.`);
