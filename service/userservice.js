const pool = require('../db');

async function adduser(user, hashedpassword) {
    const res = await pool.query("INSERT INTO users(username, email, password) values($1,$2,$3)",
        [user.username, user.email, hashedpassword]);
    return res.rowCount > 0;
}

async function getUserByEmail(email) {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return res.rows[0] || null;
}

module.exports = { adduser, getUserByEmail };