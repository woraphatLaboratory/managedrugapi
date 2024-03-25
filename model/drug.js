const mongoose = require('mongoose');

 const drugSchema = mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        nameDrug:{type:String,require:[true, "plase input name" ]},
        dose:{type:String,require:true},
        doseType:{type:String,require:true},
        qty:{type:String,require:true},
        qtyType:{type:String,require:true},
        pricePerQty:{type:Number,require:true},
        stock:{type:Number,require:true},  
        status:{type:String,require:true},
    },
    {
        timestamps:true
    }
 )

 
 const Drug = mongoose.model('Drug',drugSchema);
 module.exports = { Drug };