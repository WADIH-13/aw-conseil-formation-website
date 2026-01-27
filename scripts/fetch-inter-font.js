const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'public', 'fonts');
const destFile = path.join(destDir, 'Inter-Regular.ttf');

const url = 'https://github.com/google/fonts/raw/main/ofl/inter/Inter-Regular.ttf';

async function download() {
  try {
    await fs.promises.mkdir(destDir, { recursive: true });
    const file = fs.createWriteStream(destFile);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error('Failed to download font, status:', res.statusCode);
        process.exit(1);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Inter-Regular.ttf downloaded to', destFile);
      });
    }).on('error', (err) => {
      fs.unlink(destFile, () => {});
      console.error('Error downloading font:', err.message);
      process.exit(1);
    });
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
}

download();
