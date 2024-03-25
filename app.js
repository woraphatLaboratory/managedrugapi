const express = require('express')

const app = express() ;
const cors = require('cors')
app.use(express.json())

app.use(cors(
{
  origin: 'http://localhost:5174', // Update to use 'localhost' instead of '127.0.0.1'
  credentials: true
}));

//authen
const user = require('./route/user')
const drug = require('./route/drug')
const requisition = require('./route/requisition')
const receipt = require('./route/receipt')

app.use('/drug',user)
app.use('/drug',drug)
app.use('/drug',requisition)
app.use('/drug',receipt)

// require('./cronjob/main');

module.exports = app

