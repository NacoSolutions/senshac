// src/integrations/optimize-images.ts
import type { AstroIntegration } from 'astro';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const WIDTHS = [400, 800, 1200];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * DJB2 hash - must match syncHash in src/utils/shortcodes.ts
 */
function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return Math.abs(hash).toString(16).slice(0, 8);
}

async function optimizeImage(inputPath: string, outputDir: string, widths: number[]): Promise<void> {
  const src = inputPath.replace(path.join(process.cwd(), 'public'), '');
  const hash = djb2Hash(src);
  const baseName = path.basename(src, path.extname(src));

  for (const w of widths) {
    const outName = `${baseName}-${hash}-${w}.webp`;
    const outPath = path.join(outputDir, outName);

    if (!fs.existsSync(outPath)) {
      try {
        await sharp(inputPath).resize(w).webp({ quality: 80 }).toFile(outPath);
      } catch (e) {
        console.warn(`Failed to optimize ${inputPath}: ${e}`);
      }
    }
  }
}

async function processDirectory(dir: string, outputDir: string): Promise<void> {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && entry.name !== '_optimized') {
      await processDirectory(fullPath, outputDir);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        await optimizeImage(fullPath, outputDir, WIDTHS);
      }
    }
  }
}

export default function optimizeImages(): AstroIntegration {
  return {
    name: 'optimize-images',
    hooks: {
      'astro:build:start': async () => {
        const publicDir = path.join(process.cwd(), 'public');
        const outputDir = path.join(publicDir, '_optimized');

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log('🖼️  Optimizing images...');
        await processDirectory(path.join(publicDir, 'images'), outputDir);
        console.log('✅ Image optimization complete');
      },
    },
  };
}
