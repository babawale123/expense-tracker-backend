const Income = require("../models/incomeModels");

const addIncome = async(req,res)=>{
    const { name, amount } = req.body;
    if((!name || !name.length > 0)){
        res.status(500).json({message:"Fields cannot be empty"})
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
        const income = await Income.create({name,amount,createdAt :d, year, date, monthYear})
        return res.json({income})
    } catch (error) {
        return res.status(500).json({error})

    }
}

const getIncome = async(req,res)=>{
    const {date, year, monthYear} = req.query

    try {
        if(date){
            const income = await Income.find({date})
            return res.json({income})
        }

        if(year){
            const income = await Income.find({year})
            return res.json({income})
        }

        if(monthYear){
            const income = await Income.find({monthYear})
            return res.json({income})
        }
        const income = await Income.find({})
        res.json({income})
    } catch (error) {
        return res.status(500).json({message:"no items available"})
    }
}

const myIncome = async(req,res)=>{
    try{
        const income = await Income.find({})
        if(income.length < 0){
        res.status(404).json({message:"No item to display please add items"})
       }
        res.status(200).json({income})

    }
    catch(error){
        res.status(404).json({message:"No item found"})
    }
}


const updateIncome = async(req,res) =>{
    
    try{
       const income = await Income.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

        return res.json({income})
    }
    catch(error){
        return res.status(404).json({message:"Can not update please enter name and amount "})
    }
}

const getOneIncome = async(req,res) =>{
    try{
        const income = await Income.findById(req.params.id);
        if(!income){
        res.status(404).json({message:"not found"})
       }
         res.json(income)
    }
    catch(error){
       res.status(400).json({message:"Failed to load "})  
    }
}

const deleteIncome = async(req,res) =>{
    try{
        await Income.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Deleted successfull"})

    }
    catch(error){
        res.status(400).json({message:"Failed to Delete "}) 
    }
}
module.exports = {addIncome,getIncome,myIncome,updateIncome,getOneIncome,deleteIncome}