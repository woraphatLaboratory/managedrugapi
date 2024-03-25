const express = require('express');
require('../config/connect')
const dataRequis = express.Router();
const { Cart } = require('../model/cart')
const { Drug } = require('../model/drug')
const { Requis } = require('../model/Requis')
const moment = require('moment'); // เรียกใช้ Moment.js
require('../config/connect')
const currentYear = moment().format('YYYY');
const currentDate = moment().format('YYYY-MM-DD');

dataRequis.post('/addRequis', async(req, res) => {
  try {

    const { userReq,dateReq,userId,userPay } = req.body
    const yearTh = (parseInt(currentYear)+543).toString()
    const yearThWithoutPrefix = yearTh.substr(2);
    // const yearThWithoutPrefix = "67"
    const listDrug1 = await Cart.find({userId:userId}).sort({ id: 1 }).exec();

    const listDrug = []

    for(let i = 0; i<listDrug1.length;i++){
        const drug = await Drug.find({id:listDrug1[i].drugId}).exec();

        const st = listDrug1[i].stock

        const resData= {
            drugId:drug[0].id,
            drugName:drug[0].nameDrug + ' ' + drug[0].dose +' '+drug[0].doseType ,
            reqStock:st,
            availableStock:drug[0].stock
        }
        listDrug.push(resData)
    }

    const yearCheck = await Requis.find().sort({ reqYear: -1 ,reqRunId:-1}).limit(1).exec()
   // console.log(yearThWithoutPrefix);

    if(yearCheck.length === 0 ){
        var reqYearTrust = yearThWithoutPrefix
        var runno = 1 
    }else{
        if(yearThWithoutPrefix === yearCheck[0].reqYear){
            var reqYearTrust = yearCheck[0].reqYear
            var runno = yearCheck[0].reqRunId+1 ;
        
        }else{
            var reqYearTrust = yearThWithoutPrefix
            var runno = 1
        }
    }
    

    const jsonData = {
        reqRunId:runno,
        reqYear:reqYearTrust,
        userReq,
        userPay,
        dateReq:dateReq,
        listDrug
    }

     const newRequisition = new Requis(jsonData);
     
    newRequisition.save()
        .then((result) => {
            //console.log('Requisition saved:', result);
        })
        .catch((error) => {
            console.error('Error saving requisition:', error);
        });

       
        for(const list of listDrug){
            // console.log(list.drugId);
            const dataDrug = await Drug.find({id:list.drugId}).exec();
            var lastStock = dataDrug[0].stock - list.reqStock  
            // console.log(lastStock);
            await Drug.updateOne({ id: dataDrug[0].id }, { $set: { stock: lastStock } })
            await Cart.deleteOne({userId:userId,drugId:list.drugId})
        }

    res.json(listDrug)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  } 

})

dataRequis.post('/getRequis', async(req, res) => {
    try {
        const resdata = []
        const data = await Requis.find().sort({ id: 1 }).exec();
        for(const list of data){
            const listdata = {
                runnumber:list.reqRunId+'/'+list.reqYear,
                dateReq:list.dateReq,
                user:list.userReq,
                count:list.listDrug.length
            }
            resdata.push(listdata)
        }
        res.json(resdata)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during user creation.' });
    } 
  
  });

  dataRequis.post('/getDetailRequis', async(req, res) => {
    try {

        const running = req.body.runno
        const parts = running.split('/');
        const reqRunId = parseInt(parts[0]);
        const reqYear = parts[1];

        const resdata = []
        const data = await Requis.find({reqRunId:reqRunId,reqYear:reqYear}).exec();
        for(const list of data){
            const listdata = {
                runnumber:list.reqRunId+'/'+list.reqYear,
                dateReq:list.dateReq,
                user:list.userReq,
                count:list.listDrug.length
            }
            resdata.push(listdata)
        }
        res.json(data[0].listDrug)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during user creation.' });
    } 
  
  });

  dataRequis.post('/getDetailRequisHead', async(req, res) => {
    try {

        const running = req.body.runno
        const parts = running.split('/');
        const reqRunId = parseInt(parts[0]);
        const reqYear = parts[1];

        const resdata = []
        const data = await Requis.find({reqRunId:reqRunId,reqYear:reqYear}).exec();
        for(const list of data){
            const listdata = {
                runnumber:list.reqRunId+'/'+list.reqYear,
                dateReq:list.dateReq,
                user:list.userReq,
                count:list.listDrug.length
            }
            resdata.push(listdata)
        }
        res.json(resdata)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during user creation.' });
    } 
  
  });



module.exports = dataRequis;