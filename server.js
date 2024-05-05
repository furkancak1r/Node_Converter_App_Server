const express = require('express');
const multer = require('multer');
const jpegToPng = require('./conversions/jpegToPng');
const pngToJpeg = require('./conversions/pngToJpeg');
const jpegToPdf = require('./conversions/jpegToPdf');
const cors = require('cors');
const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
    fieldSize: 250 * 1024 * 1024  // 250 MB
  }
});

app.use(cors());

// JPEG to PNG Conversion
app.post('/convert/jpeg-to-png', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    const convertedFiles = await Promise.all(
      req.files.map(file => jpegToPng(file.buffer))
    );
    res.status(200).json(convertedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Conversion failed', error: error.message });
  }
});

// PNG to JPEG Conversion
app.post('/convert/png-to-jpeg', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    const convertedFiles = await Promise.all(
      req.files.map(file => pngToJpeg(file.buffer))
    );
    res.status(200).json(convertedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Conversion failed', error: error.message });
  }
});

// JPEG to PDF Conversion
app.post('/convert/jpeg-to-pdf', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    let pdfArray = [];
    // Map uploaded files to their buffer contents
    const imagesBuffers = req.files.map(file => file.buffer);
    // Convert JPEG images to a single PDF buffer
    const pdfBuffer = await jpegToPdf(imagesBuffers);
    pdfArray.push(pdfBuffer);
    // Set headers for PDF download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="converted-${Date.now()}.pdf"`
    });
    // Send the PDF file to the client
    res.send(pdfArray);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Conversion failed', error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
