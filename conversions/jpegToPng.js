const sharp = require('sharp');

async function jpegToPng(buffer) {
  console.log('Converting JPEG to PNG...');
  return await sharp(buffer).png().toBuffer();
}

module.exports = jpegToPng;
