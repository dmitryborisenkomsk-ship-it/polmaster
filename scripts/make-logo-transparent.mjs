/**
 * Делает тёмный фон логотипа прозрачным. Сохраняет результат в public/logo.png.
 * Запуск: node scripts/make-logo-transparent.mjs (из корня проекта)
 *
 * Если у вас уже есть PNG с прозрачным фоном — просто скопируйте его
 * в public/logo.png (замените текущий файл), скрипт запускать не нужно.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const logoPath = join(root, 'public', 'logo.png');

// Тёмный фон (чёрный и тёмно-серый): пиксели с R,G,B <= THRESHOLD делаем прозрачными
const THRESHOLD = 60;

const buffer = readFileSync(logoPath);
const image = sharp(buffer);
const meta = await image.metadata();
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const channels = info.channels;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r <= THRESHOLD && g <= THRESHOLD && b <= THRESHOLD) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png()
  .toFile(logoPath);

console.log('Логотип обновлён: чёрный фон заменён на прозрачный (public/logo.png)');
