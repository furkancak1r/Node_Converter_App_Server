/*const sharp = require('sharp');

async function pngToJpeg(buffer) {
  return await sharp(buffer).jpeg().toBuffer();
}

module.exports = pngToJpeg; */

const Jimp = require('jimp');

// Buffer ile PNG'yi JPEG'e dönüştürme fonksiyonu
async function pngToJpeg(buffer) {
  // Buffer'dan resim yarat
  const image = await Jimp.read(buffer);
  // JPEG formatına çevir ve kalite ayarla (varsayılan %100 kalite)
  await image.quality(90); // JPEG kalitesini %90 olarak ayarla
  // JPEG olarak tekrar buffer'a çevir
  const jpegBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  return jpegBuffer;
}

module.exports = pngToJpeg;

