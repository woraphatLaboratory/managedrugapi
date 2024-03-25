const express = require('express');
require('../config/connect')
const getDrugHis = express.Router();
const { Drug } = require('../model/drug')
const { Requis } = require('../model/Requis')
const { Reciept } = require('../model/Reciep')

getDrugHis.post('/getDrugHis', async(req, res) => {
  try {
        const { DateStart,DateEnd } = req.body
        const data = await Drug.find().sort({ id: 1 }).exec();
        const drug = [] 
        if(!DateStart || !DateEnd){
            for(const list of data){
                const reqData = await Requis.find({
                    'listDrug.drugId': list.id,
                   
                }).sort({ reqRunId: 1 }).exec();
                const recData = await Reciept.find({
                    'listDrug.drugId': list.id,
                }).sort({ recRunId: 1 }).exec();
                const listDrugData = {
                    id: list.id,
                    nameDrug: list.nameDrug + ' ' + list.dose + ' ' + list.doseType,
                };
            
                if (reqData.length === 0 && recData.length === 0) {
                    // ไม่ต้องทำอะไรเพราะไม่มีข้อมูลทั้ง reqData และ recData
                } else {
                    listDrugData.countReq = reqData.length;
                    listDrugData.countRec = recData.length;
                    drug.push(listDrugData);
                }
            }
        }else{
        
        for(const list of data){
            const reqData = await Requis.find({
                'listDrug.drugId': list.id,
                'dateReq': { $gte: DateStart+'-01', $lte: DateEnd+'01' } 
            }).sort({ reqRunId: 1 }).exec();
        
            const recData = await Reciept.find({
                'listDrug.drugId': list.id,
                'dateReq': { $gte: DateStart, $lte: DateEnd } 
            }).sort({ recRunId: 1 }).exec();
            const listDrugData = {
                id: list.id,
                nameDrug: list.nameDrug + ' ' + list.dose + ' ' + list.doseType,
            };
        
            if (reqData.length === 0 && recData.length === 0) {
                // ไม่ต้องทำอะไรเพราะไม่มีข้อมูลทั้ง reqData และ recData
            } else {
                listDrugData.countReq = reqData.length;
                listDrugData.countRec = recData.length;
                drug.push(listDrugData);
            }
        }
        }
        res.json(drug);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during user creation.' });
  }

})
 
module.exports = getDrugHis;

