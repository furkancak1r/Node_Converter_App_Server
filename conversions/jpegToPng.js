/*const sharp = require('sharp');

async function jpegToPng(buffer) {
  return await sharp(buffer).png().toBuffer();
}

module.exports = jpegToPng;*/


const Jimp = require('jimp');

// Buffer ile JPEG'i PNG'ye dönüştürme fonksiyonu
async function jpegToPng(buffer) {
  // Buffer'dan resim yarat
  const image = await Jimp.read(buffer);
  // PNG olarak tekrar buffer'a çevir
  const pngBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
  return pngBuffer;
}

module.exports = jpegToPng;

