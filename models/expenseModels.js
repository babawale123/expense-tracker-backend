const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
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
const Expense = mongoose.model('expense',expenseSchema);
module.exports = Expense;