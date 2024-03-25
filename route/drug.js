const express = require('express');
const router = express.Router();

const addDrug = require('../controller/addDrug');
const getDrug = require('../controller/getDrug');
const getDrugHis = require('../controller/export');

router.use('/drug', addDrug);
router.use('/drug', getDrug);
router.use('/drug', getDrugHis);

module.exports = router