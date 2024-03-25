const express = require('express');
const router = express.Router();

const dataRequis = require('../controller/Requis');

router.use('/requis', dataRequis);


module.exports = router