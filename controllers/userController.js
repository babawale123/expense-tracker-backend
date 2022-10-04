
// exports.register = async(req,res) => {
// 	const {username, email, password} = req.body;

// 	if(!username || !email || !password){
// 		res.status(400).json({message:"filled must not be empty"})
// 	}


// 	const userEmail = await userModel.findOne({email})
// 	if(userEmail){
// 		res.status(500).json({message:"email already exist"})
// 	}

// 	const salt = bcrypt.genSaltSync(10)
// 	const hash = bcrypt.hashSync(req.body.password, salt)

// 	const user = new userModel({
// 		username:req.body.username, 
// 		email:req.body.email,
// 		password:hash
// 	})
// 	const savedUser = await user.save()
// 	return res.status(200).json(savedUser)
// }


// exports.login = async(req,res)=>{
// 	const {email,password} = req.body
// 	if(!email || !password){
// 		res.status(400).json({message:"filled must not be empty"})
// 	}
// 	try{

// 		const user = await userModel.findOne({email:req.body.email})
// 		if(!email){
// 			res.status(404).json({message:"user not found"})
// 		}
// 		const matchPassword  = await bcrypt.compare(req.body.password, user.password)
// 		if(!matchPassword) {
// 			res.status(404).json({message:"password does not exist"})
// 		}
// 		const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT)

// 		const {password, isAdmin, ...others} = user._doc

// 		res.status(200).json({...others,token})

// 	}
// 	catch(error){
// 		res.status(404).json({message:"Server error"})

// 	}
// }

const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async(req,res) =>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(404).json({message:"Please enter credentials"})
    }

    try{
        const userName = await User.findOne({username});
    if(userName){
        res.status(404).json({message:"username exist"})
    }

    const userEmail = await User.findOne({email});
    if(userEmail){
        res.status(404).json({message:"email already exist"})
    }
    else{
    const user = await User.create({username, email, password})

    return res.status(200).json({user})}

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt)
    // const newUser = new User({
    //     username:req.body.username,
    //     email:req.body.email,
    //     password:hash
    // });
    // const savedUser = await newUser.save()
    // return res.json({savedUser});
    }

    catch(error){
        res.status(404).json({message:"email already exist"})
     }
}

const login = async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if(!isMatched){
            return res.status(400).json({message:"invalid credentials"})
        }

        const token = jwt.sign({id:user._id, is_admin:user.is_admin},process.env.JWT,{expiresIn: process.env.JWT_EXPIRE})
        const {password, is_admin, ...otherDetails} = user._doc
        return res.status(200).json({...otherDetails,token})
        //return res.cookie('access_token',token,{httpOnly:true}).status(200).json({...otherDetails,token})
    } catch (error) {
        return res.status(402).json({message:"Server Error"})
    }
}

module.exports = {register, login}

