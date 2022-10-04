
const mongoose = require("mongoose")

const connectDB = async(req,res) =>{
	try{
		const connect = await mongoose.connect(process.env.DBCONNECT, {
		UseNewUrlParser:true,
		UseUnifiedTopology:true
	});
		console.log(`connected to mongoDb through ${connect.connection.host} successfull`)
	}
	catch(error){
		console.log(error)
	}
}


module.exports = connectDB