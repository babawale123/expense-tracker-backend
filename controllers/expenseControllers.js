const Expense = require("../models/expenseModels");

const addExpense = async(req,res)=>{
    const { name, amount } = req.body;
    if((!name || !name.length > 0)){
        res.status(500).json({message:"Please Enter Name and Amount"})
    }

    if((!amount || !amount.length < 0)){
        res.status(500).json({message:"amount must not be zero"})
    }

    const d = new Date()

    const year = d.getFullYear();
    const date = d.toDateString()
    const month = d.getMonth()

    const monthYear = `${month}${year}`

    try {
        const expense = await Expense.create({name,amount,createdAt :d, year, date, monthYear})
        return res.json({expense})
    } catch (error) {
        return res.status(500).json({error})

    }
}

const getExpense = async(req,res)=>{
    const {date, year, monthYear} = req.query

    try {
        if(date){
            const expense = await Expense.find({date})
            return res.json({expense})
        }

        if(year){
            const expense = await Expense.find({year})
            return res.json({expense})
        }

        if(monthYear){
            const expense = await Expense.find({monthYear})
            return res.json({expense})
        }
        const expense = await Expense.find({})
        res.json({expense})
    } catch (error) {
        return res.status(500).json({message:"no items available"})
    }
}

const myExpense = async(req,res)=>{
    try{
        const expense = await Expense.find({})
        res.status(200).json({expense})

    }
    catch(error){
        res.status(404).json({message:"No item found"})
    }
}


const updateExpense = async(req,res) =>{
    const {name, amount} = req.body;

    if(!name || !amount){
        return res.status(404).json({message:"Please Name and Amount can not be empty when updating"})
    }
    
    try{
       const expense = await Expense.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
       if(!expense){
            return res.status(404).json({message:"Can not find expense"})
       }
        return res.json({expense})
    }
    catch(error){
        return res.status(404).json({message:"Can not update please enter name and amount "})
    }
}

const getOneExpense = async(req,res) =>{
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
                   res.status(400).json({message:"can not find Item "})  

        }
         res.json(expense)
        
    }
    catch(error){
       res.status(400).json({message:"Failed to load "})  
    }
}

const deleteExpense = async(req,res) =>{
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Deleted successfull"})

    }
    catch(error){
        res.status(404).json({message:"Failed to Delete "}) 
    }
}
module.exports = {addExpense,getExpense,myExpense,updateExpense,getOneExpense,deleteExpense}