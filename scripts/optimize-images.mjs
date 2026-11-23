/**
 * Optimisation des photos + génération du manifeste d'images.
 * -------------------------------------------------------------------------
 * Lancé automatiquement avant chaque build (`npm run build:web`, Vercel).
 *
 * 1. Redimensionne / recompresse chaque .webp de public/images/** qui dépasse
 *    la largeur maximale utile de son dossier (une photo de 4032 px affichée
 *    dans une carte de 350 px gaspillait jusqu'à 1,2 Mo).
 *    → Vous pouvez donc déposer vos photos telles quelles : le build
 *      s'occupe de les alléger.
 * 2. Écrit utils/imageManifest.ts : la liste des photos réellement présentes
 *    avec leurs dimensions. Le site ne demande ainsi JAMAIS une photo
 *    inexistante (plus de requêtes 404) et réserve la bonne place à l'écran.
 *
 * Usage : node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'utils', 'imageManifest.ts');

/** Largeur max (px) par dossier — ~2x la taille d'affichage réelle. */
const MAX_WIDTH = {
  restaurant: 1600,
  services: 1000,
  gallery: 1000,
  menu: 640,
};
const DEFAULT_MAX_WIDTH = 1200;
const QUALITY = 72;
/** Sous ce poids, une photo déjà à la bonne taille n'est pas recompressée. */
const SKIP_BELOW_BYTES = 250 * 1024;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const manifest = {};
let saved = 0;

for (const file of walk(IMAGES_DIR).sort()) {
  if (!/\.(webp|jpe?g|png)$/i.test(file)) continue;
  const rel = path.relative(IMAGES_DIR, file).split(path.sep).join('/');
  const folder = rel.split('/')[0];
  const maxWidth = MAX_WIDTH[folder] ?? DEFAULT_MAX_WIDTH;

  // Les .jpg/.png déposés par erreur sont convertis en .webp.
  const isWebp = /\.webp$/i.test(file);
  const outFile = isWebp ? file : file.replace(/\.(jpe?g|png)$/i, '.webp');

  const input = fs.readFileSync(file);
  const meta = await sharp(input).rotate().metadata();
  const width = meta.autoOrient?.width ?? meta.width;
  const tooWide = width > maxWidth;

  if (!isWebp || tooWide || input.length > SKIP_BELOW_BYTES) {
    const out = await sharp(input)
      .rotate() // respecte l'orientation EXIF des photos de téléphone
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();
    if (!isWebp || out.length < input.length) {
      fs.writeFileSync(outFile, out);
      if (!isWebp) fs.unlinkSync(file);
      saved += input.length - out.length;
      console.log(`✔ ${rel}: ${(input.length / 1024) | 0} Ko → ${(out.length / 1024) | 0} Ko`);
    }
  }

  const finalMeta = await sharp(outFile).metadata();
  const key = '/images/' + path.relative(IMAGES_DIR, outFile).split(path.sep).join('/');
  manifest[key] = [finalMeta.width, finalMeta.height];
}

const body = `// ⚠️ Fichier GÉNÉRÉ automatiquement par scripts/optimize-images.mjs.
// Ne pas modifier à la main : il est recréé à chaque build.
// Liste des photos présentes dans public/images avec leurs dimensions [largeur, hauteur].

export const imageManifest: Record<string, readonly [number, number]> = ${JSON.stringify(manifest, null, 2)};
`;
fs.writeFileSync(MANIFEST, body);

console.log(
  `\n${Object.keys(manifest).length} images dans le manifeste` +
    (saved > 0 ? ` — ${(saved / 1024 / 1024).toFixed(1)} Mo économisés.` : '.'),
);
