const express = require('express');
const jwt = require('jsonwebtoken');
require('../config/connect')
const login = express.Router();
const { User } = require('../model/user')

login.post('/login', async(req, res) => {
  try {
    const login = await User.findOne(req.body).exec();
      if(!login){
        res.status(200).json({status:401, message: "Invalid username or password" });
      }else{
        const token = jwt.sign(
          { username: login.username },
          process.env.TOKEN_KEY, 
          { expiresIn: '16h' })
          res.status(200).json({ token, fullname: login.fullName,id:login.id,role:login.role  } );
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

});
 
 
module.exports = login;

