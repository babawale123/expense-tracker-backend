<<<<<<< HEAD
const mongoose = require("mongoose")
=======
const  mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

>>>>>>> 3bc12cc ('yy')

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
<<<<<<< HEAD
		unique: true,
	},
	password:{
		type:String,
		required:true,
		unique: true,
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
},

{
	timestamp:true
})

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel
=======
		},
	password:{

		type:String,
		required:true,
		},

	is_admin:{
		type:Boolean,
		default:false,
	},
},
{
	timestamp:true,
}

);//hash password
userSchema.pre("save", async function(next){
	if(!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
})
//end of password hash



const User = mongoose.model('user', userSchema);

module.exports = User;
>>>>>>> 3bc12cc ('yy')
