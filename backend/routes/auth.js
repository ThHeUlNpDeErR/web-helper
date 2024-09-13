const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const sendMail = require('../utils/mailer');
const { restrict } = require('../utils/auth');

router.post('/login', function (req, res, next) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (err) return next(err);
        if (user) {
            req.session.regenerate(function () {
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.name
                    + ' click to <a href="/logout">logout</a>. '
                    + ' You may now access <a href="/restricted">/restricted</a>.';
                
                const subject = 'Login Notification';
                const text = 'You have logged in to our site.';
                const html = '<p>You have logged in to our site.</p>';
                sendMail(user.email, subject, text, html);

                res.redirect('/restricted');
            });
        } else {
            req.session.error = 'Authentication failed, please check your username and password.';
            res.redirect('/login');
        }
    });
});

router.get('/', function (req, res) {
    res.redirect('/login');
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: req.session.message || '' });
    delete req.session.message; // 清除消息
});

router.get('/restricted', restrict, function (req, res) {
    res.render('restricted', { user: req.session.user });
});

module.exports = router;