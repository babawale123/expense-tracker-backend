const express = require('express')
<<<<<<< HEAD
const dotenv = require('dotenv')
const cors = require("cors")
const connectDB = require("./config/db")
const userRoute = require("./routes/userRoute")
const noteRoute = require("./routes/noteRoute")
const app = express()
=======
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const incomeRouter = require('./routes/incomeRoute')
const expenseRouter = require('./routes/expenseRoute')
const userRouter = require('./routes/userRoute')
const cors = require('cors')
const cookies = require('cookie-parser')

>>>>>>> 3bc12cc ('yy')
dotenv.config()
connectDB()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
<<<<<<< HEAD
app.use(cors(corsOptions))
app.use(cors(corsOptions));
app.use(express.json())
app.use('/api/user', userRoute)
app.use('/api/notes', noteRoute)

const port = process.env.port || 4000
app.listen(port, ()=>console.log(`app running on port ${port}...`))
=======


//midlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookies())

app.use('/api/users', userRouter)
app.use('/api/income', incomeRouter)
app.use('/api/expense', expenseRouter)

const port = process.env.port || 5000
app.listen(port, ()=> console.log(`server running on port ${port}`))
>>>>>>> 3bc12cc ('yy')
