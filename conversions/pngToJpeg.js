const sharp = require('sharp');

async function pngToJpeg(buffer) {
  return await sharp(buffer).jpeg().toBuffer();
}

module.exports = pngToJpeg;
