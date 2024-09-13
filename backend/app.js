require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = module.exports = express();
const port = process.env.PORT || 3000;
app.set('port', port)

// 中间件配置
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.SESSION_SECRET || 'your-secret-key',
}));

// Session-persisted message middleware

app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// 设置视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/contact'));
app.use('/', require('./routes/resources'));
app.use('/', require('./routes/upload'));

// 启动服务器
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
