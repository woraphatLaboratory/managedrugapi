const mongoose = require('mongoose');

const listDrugSchema = mongoose.Schema({
    drugId: { type: String, required: true},
    drugName:{type:String,require:true},
    reqStock :{ type: Number, required: true},
    availableStock: {type:Number,required:true}
});

 const recieptSchema = mongoose.Schema(
    {
        recRunId: { type: Number, required: true },
        recYear:{type:String,require:true},
        userRec:{type:String,require:true},
        dateRec:{type:String,require:true},
        listDrug:[listDrugSchema]
    }, 
    {
        timestamps:true 
    }
 )
 
 
 const Reciept = mongoose.model('Reciept',recieptSchema);
 module.exports = { Reciept }; 