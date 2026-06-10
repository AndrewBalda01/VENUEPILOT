const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

async function getLogin(req, res) {
  if (req.cookies.token) {
    return res.redirect('/dashboard');
  }
  res.render('index', { error: null });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('index', { error: 'Email and password are required.' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.render('index', { error: 'Invalid email or password.' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.render('index', { error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    res.render('index', { error: 'Something went wrong. Please try again.' });
  }
}

function logout(req, res) {
  res.clearCookie('token');
  res.redirect('/');
}

module.exports = { getLogin, login, logout };
