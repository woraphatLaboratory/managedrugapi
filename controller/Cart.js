const express = require('express');
require('../config/connect')
const dataCart = express.Router();
const { Cart,CartRec } = require('../model/cart')
const { Drug } = require('../model/drug')

dataCart.post('/getCart', async(req, res) => {
  try {
    const userId = req.body.userId
    const data = await Cart.find({userId:userId}).sort({ id: 1 }).exec();
    const cartData = []
    for(let i = 0; i<data.length;i++){
        const drug = await Drug.find({id:data[i].drugId}).exec();
        data[i].nameDrug = drug.nameDrug
        const resData= {
            id:data[i].id,
            userId:data[i].userId,
            drugId:data[i].drugId,
            nameDrug:drug[0].nameDrug +' '+ drug[0].dose +' '+ drug[0].doseType,
            stock:data[i].stock,
            balanceStock:drug[0].stock,
            lastStock:drug[0].stock-data[i].stock

        }
        cartData.push(resData)
    
    }
    
     res.json(cartData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

});

dataCart.post('/getCartRec', async(req, res) => {
  try {
    const userId = req.body.userId
    const data = await CartRec.find({userId:userId}).sort({ id: 1 }).exec();
    const cartData = []
    for(let i = 0; i<data.length;i++){
        const drug = await Drug.find({id:data[i].drugId}).exec();
        data[i].nameDrug = drug.nameDrug
        const resData= {
            id:data[i].id,
            userId:data[i].userId,
            drugId:data[i].drugId,
            nameDrug:drug[0].nameDrug,
            stock:data[i].stock,
            balanceStock:drug[0].stock,
            lastStock:drug[0].stock+data[i].stock

        }
        cartData.push(resData)
    
    }
    
     res.json(cartData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

});

dataCart.post('/addCart', async(req, res) => {
    try {
        
  
    const id_count = await Cart.findOne().sort({ id: -1 }).exec();
    if(id_count === null){
        var idIncret = 1
    }else{
        var idIncret = id_count.id + 1
    }
   
    const {  userId, drugId,stock } = req.body;

    const newDrug = new Cart({
        id:idIncret,
        userId,
        drugId,
        stock,
       
    });

    await newDrug.save();
    res.json(newDrug)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during user creation.' });
    }
  
  });

  dataCart.post('/addCartRec', async(req, res) => {
    try {
        
  
    const id_count = await CartRec.findOne().sort({ id: -1 }).exec();
    if(id_count === null){
        var idIncret = 1
    }else{
        var idIncret = id_count.id + 1
    }
   
    const {  userId, drugId,stock } = req.body;

    const newDrug = new CartRec({
        id:idIncret,
        userId,
        drugId,
        stock,
       
    });

    await newDrug.save();
    res.json(newDrug)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during user creation.' });
    }
  
  });

  dataCart.post('/deleteCart', async(req, res) => {
    try {
    const { userId,drugId } = req.body
    await Cart.deleteOne({userId:userId,drugId:drugId})
    res.json('success')
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during user creation.' });
    }
  
  });

  dataCart.post('/deleteCartRec', async(req, res) => {
    try {
    const { userId,drugId } = req.body
    await CartRec.deleteOne({userId:userId,drugId:drugId})
    res.json('success')
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during user creation.' });
    }
  
  });

module.exports = dataCart;