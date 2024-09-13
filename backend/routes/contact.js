const express = require('express');
const router = express.Router();
const { restrict } = require('../utils/auth');

router.get('/contact', restrict, function (req, res) {
    res.render('contact');
});

module.exports = router;