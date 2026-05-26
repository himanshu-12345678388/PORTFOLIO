import { cp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

const entries = [
  'index.html',
  'style.css',
  'script.js',
  'mee.jpeg',
  'projecttitele.jpeg',
  'assets',
  'SAP',
  'certificates',
  'achievements'
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of entries) {
  await cp(join(root, entry), join(dist, entry), {
    recursive: true,
    force: true,
    errorOnExist: false
  });
}

console.log('Static portfolio built to dist/');
