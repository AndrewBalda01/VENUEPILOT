const express = require('express');
const router = express.Router();
const { getLogin, login, logout } = require('../controllers/authController');

router.get('/', getLogin);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
