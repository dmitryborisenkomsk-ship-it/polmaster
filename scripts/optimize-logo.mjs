/**
 * Генерирует уменьшенные и WebP-версии логотипа для Header/Footer (отображаемый размер 40×40, 2× = 80×80).
 * Запуск: node scripts/optimize-logo.mjs
 * Результат: public/logo-80.webp, public/logo-80.png
 */

import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'public', 'logo.png');
const size = 80; // 2× для отображения 40×40

if (!existsSync(inputPath)) {
  console.warn('public/logo.png не найден, пропуск оптимизации.');
  process.exit(0);
}

const buffer = readFileSync(inputPath);

async function run() {
  const pipeline = sharp(buffer).resize(size, size);
  const webpPath = join(root, 'public', 'logo-80.webp');
  const pngPath = join(root, 'public', 'logo-80.png');

  await pipeline.clone().webp({ quality: 85 }).toFile(webpPath);
  await pipeline.clone().png({ compressionLevel: 6 }).toFile(pngPath);

  console.log('Логотип оптимизирован: logo-80.webp, logo-80.png');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
