const express = require('express');
require('../config/connect')
const addDrug = express.Router();
const { Drug } = require('../model/drug')

addDrug.post('/addDrug', async(req, res) => {
  try {

    const id_count = await Drug.findOne().sort({ id: -1 }).exec();
    if(id_count === null){
        var idIncret = 1
    }else{
        var idIncret = id_count.id + 1
    }
   
    const { nameDrug, dose, doseType,qty,qtyType,pricePerQty,stock,status } = req.body;

    const newDrug = new Drug({
        id:idIncret,
        nameDrug,
        dose,
        doseType,
        qty,
        qtyType,
        pricePerQty,
        stock,
        status
    });

    await newDrug.save();
 
     res.json({ message: 'Drug added successfully',id_count:id_count});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

})
 
addDrug.post('/updateDrug', async(req, res) => {
  try {
    
    const idDrug = req.body.durgid
    const oldStatus = req.body.status

    if(oldStatus === 'close'){

      var lastStatus = 'open'
    }else{
      var lastStatus = 'close'
    }

    await Drug.updateOne({ id: idDrug }, { $set: { status: lastStatus } })
     res.json({ message: 'Drug Update successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

})


addDrug.post('/updateDrugData', async(req, res) => {
  try {

    const { id,nameDrug, dose, doseType,qty,qtyType,pricePerQty,stock } = req.body;

    await Drug.updateOne({id:id},{$set:req.body}) 
     res.json({ message: 'Drug update successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

})


addDrug.post('/updateStock', async(req, res) => {
  try {

    const { id,stock } = req.body;

    await Drug.updateOne({id:id},{$set:{stock:stock}}) 
     res.json({ message: 'Drug update successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

})
module.exports = addDrug;

