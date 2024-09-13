const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// 假设用户信息存储在 users.json 文件中
let users = [];
const usersFilePath = path.join(__dirname, '../data/users.json');

fs.readFile(usersFilePath, 'utf8', async (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('users.json file not found, creating a new one.');
            fs.writeFileSync(usersFilePath, JSON.stringify({ users: [] }), 'utf8');
        } else {
            console.error('Error reading user data:', err);
        }
    } else {
        users = JSON.parse(data).users;

        // 哈希化密码
        for (let user of users) {
            if (!user.password.startsWith('$2b$')) { // 检查密码是否已经哈希化
                user.password = await bcrypt.hash(user.password, 10);
            }
        }

        // 写回哈希化后的用户数据
        fs.writeFileSync(usersFilePath, JSON.stringify({ users }), 'utf8');
        console.log('Passwords hashed and users.json updated.');
    }
});

// 认证函数
function authenticate(username, password, callback) {
    const user = users.find(u => u.username === username);
    if (!user) return callback(null, null);
    bcrypt.compare(password, user.password, (err, res) => {
        if (err) return callback(err);
        if (res) return callback(null, user);
        callback(null, null);
    });
}

// 访问限制中间件
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

module.exports = { authenticate, restrict };