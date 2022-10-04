const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserModel"
    },
},
{
    timestamps:true,
})

const Note = mongoose.model('note', noteSchema)

module.exports = Note