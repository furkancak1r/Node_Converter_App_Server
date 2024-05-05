const PDFDocument = require('pdfkit');
const fs = require('fs');

function jpegToPdf(jpegBuffers) {
    return new Promise((resolve, reject) => {
        // Yeni bir PDF belgesi oluştur
        const doc = new PDFDocument({ margin: 0, size: 'A4' });
        const buffers = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        // Her bir JPEG buffer için işlem yap
        jpegBuffers.forEach((jpegBuffer, index) => {
            if (index > 0) doc.addPage({ size: 'A4' }); // İlk sayfa otomatik olarak eklenir, sonrakiler için sayfa ekleyin

            doc.image(jpegBuffer, 0, 0, { fit: [595, 842], align: 'center', valign: 'center' });
        });

        // PDF belgesini bitir
        doc.end();
    });
}

module.exports = jpegToPdf;