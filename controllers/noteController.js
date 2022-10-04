const { json } = require("express");
const Note = require("../models/noteModel");

exports.create =  async(req,res) =>{
    const {title, content, category} = req.body;

    if(!title || !content || !category) {
        res.status(404).json({message:"fills must not be empty"})
    }
    else {

        const note = new Note({ user: req.user._id, title, content, category });
        const savedNote =  await note.save()
        return res.json({savedNote})
    }


}

exports.getNote = async(req,res) =>{
    const note = await Note.find({user:req.user._id})
    return res.json({note})
}

exports.getOneNote = async(req,res) =>{
    const note = await Note.findById(req.params.id)

    if(note){
        res.json({note})
    }
}

exports.updateNote = async(req,res) => {
    const {title,content, category} = req.body
    if(!title || !content || !category){
        res.status(401).json({message:"filled must not be empty"})

    }
    try {
        const note = await Note.findById(req.params.id)
        if(!note){
            res.status(404).json({message:"note not found"})
        }

   
        if(note.user.toString() !== req.user._id.toString()){
            res.status(401).json({message:"you not authorised to update note"})
        }
        if(note){
            note.title = title;
            note.content = content;
            note.category = category;

            const updatedNote = await note.save()
            res.status(200).json({updatedNote})
        }
    } catch (error) {
        res.status(500).json({message:"Failed to update"})
    }
    
}

exports.deleteNote = async(req,res) =>{
   try {
        const note = await Note.findById(req.params.id)
        if(!note){
            res.status(404).json({message:"note not found"})
        }
        if(note.user.toString() !== req.user._id.toString()){
            res.status(402).json({message:"You're not authorised to delete note"})
        }
        else{
            await note.remove()
            res.status(200).json({message:"Note deleted successful"})
        }
   } catch (error) {
        res.status(500).json({message:"Failed to delete"})
   }
}