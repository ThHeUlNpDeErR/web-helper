const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { restrict } = require('../utils/auth');

// 文件上传配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/upload', restrict, upload.array('uploads', 10), function (req, res) {
    console.log(req.files);
    res.redirect('back');
});

router.get('/upload', restrict, function (req, res) {
    res.render('upload');
});

module.exports = router;