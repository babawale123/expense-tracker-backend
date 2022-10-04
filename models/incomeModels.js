const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        
    },
    year:{
        type:String,
        
    },
    monthYear:{
        type:String,
       
    },
});
const Income = mongoose.model('income',incomeSchema);
module.exports = Income;