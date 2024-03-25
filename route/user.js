const express = require('express');
const router = express.Router();

const login = require('../controller/login');
const Cart = require('../controller/Cart');

router.use('/user', login);
router.use('/user', Cart);

module.exports = router