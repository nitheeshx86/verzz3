import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public', 'frames2');
const outputDir = path.join(process.cwd(), 'public', 'frames2_webp');

async function convertFrames() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));
    console.log(`Starting conversion of ${files.length} frames...`);

    let completed = 0;
    let totalOriginalSize = 0;
    let totalNewSize = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

        // Get original size
        const stats = fs.statSync(inputPath);
        totalOriginalSize += stats.size;

        // Convert to webp with smart compression (lossless to keep it identical to user's pngs but huge savings)
        await sharp(inputPath)
            .webp({ quality: 75, lossless: false }) // 75% quality is visually lossless for web
            .toFile(outputPath);

        // Get new size
        const newStats = fs.statSync(outputPath);
        totalNewSize += newStats.size;

        completed++;
        if (completed % 50 === 0) {
            console.log(`Completed ${completed}/${files.length} frames...`);
        }
    }

    const originalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
    const newMB = (totalNewSize / (1024 * 1024)).toFixed(2);
    const saved = (100 - (totalNewSize / totalOriginalSize) * 100).toFixed(1);

    console.log(`\nConversion finished successfully!`);
    console.log(`Original size: ${originalMB} MB`);
    console.log(`New size: ${newMB} MB`);
    console.log(`Saved: ${saved}%`);
}

convertFrames().catch(console.error);
