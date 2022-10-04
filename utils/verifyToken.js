const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];
  
       return jwt.verify(token,process.env.JWT, (err, user)=>{
            if(err){
                return res.status(401).json({message:"session expire log in again"})
            }
            req.user = user;
            return next();
        });
    }
    else{
        return res.status(500).json({message:"provide token"})
    }
};

const verifyUser = (req, res, next) => {
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.is_admin){
            return next();
        }
        else{
                return res.status(500).json({message:"You are not an authorised user"})
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req,res,()=>{
        if(req.user.is_admin){
            return next();
        }
        else{
               return res.status(500).json({message:"You are not an Admin"})
        }
    })
}

module.exports = {verifyToken,verifyUser ,verifyAdmin}


// const jwt = require("jsonwebtoken")
// const User = require('../models/UserModel')

// const verifyToken = async (req, res, next) =>{
//         let token;

//        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         token = req.headers.authorization.split(" ")[1]
//          }
//         if(!token){
//                 res.status(401).json({message:"not authorised to access this route"});
//         }

//       try{
//             const decoded = jwt.verify(token, process.env.JWT);

//             const user = await User.findById(decoded.id);

//             if(!user){
//                 res.status(401).json({message:"no user found with this id"});
//             }
//             req.user = user;
//             return next();
//         }
//   catch(error){
//     return  res.status(401).json({message:"no token"})
//   }
  
// }

// const verifyUser = (req, res, next) => {
//     verifyToken(req,res,next, ()=>{
//         if(req.user.id === req.params.id || req.user.is_admin){
//             return next();
//         }
//         else{
//                 return res.status(500).json({message:"You are not an authorised user"})
//         }
//     })
// }

// const verifyAdmin = (req, res, next) => {
//     verifyToken(req,res,()=>{
//         if(req.user.is_admin){
//             return next();
//         }
//         else{
//                return res.status(500).json({message:"You are not an Admin"})
//         }
//     })
// }

// module.exports = {verifyToken,verifyUser ,verifyAdmin}

