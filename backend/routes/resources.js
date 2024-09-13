const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { restrict } = require('../utils/auth');

router.get('/resources', restrict, (req, res) => {
    const pdfs = fs.readdirSync(path.join(__dirname, '../public/pdfs'));
    res.render('resources', { pdfs });
});

router.get('/resources/:filename', restrict, (req, res) => {
    const filename = req.params.filename;
    const pdfUrl = `/pdfs/${filename}`;
    res.render('pdfviewer', { pdfUrl });
});

router.get('/download/:filename', restrict, (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../public/pdfs', filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });
});

module.exports = router;