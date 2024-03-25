const express = require('express');
const router = express.Router();

const dataReceipt = require('../controller/Receipt');

router.use('/Receipt', dataReceipt);


module.exports = router