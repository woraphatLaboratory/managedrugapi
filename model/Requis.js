const mongoose = require('mongoose');

const listDrugSchema = mongoose.Schema({
    drugId: { type: String, required: true},
    drugName:{type:String,require:true},
    reqStock :{ type: Number, required: true},
    availableStock: {type:Number,required:true}
});

 const requisSchema = mongoose.Schema(
    {
        reqRunId: { type: Number, required: true },
        reqYear:{type:String,require:true},
        userReq:{type:String,require:true},
        userPay:{type:String,require:true},
        dateReq:{type:String,require:true},
        listDrug:[listDrugSchema]
    }, 
    {
        timestamps:true 
    }
 )
 
 
 const Requis = mongoose.model('Requis',requisSchema);
 module.exports = { Requis }; 