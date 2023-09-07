import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answersRoutes from './routes/Answers.js'
const app= express();
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))

app.use(cors())
dotenv.config({ path: '.env' })
app.get('/',(req,res)=>{
    res.send("this is a stack overflow clone api")
})
//"mongodb+srv://anikets2408:12345@cluster0.zihbi1l.mongodb.net/?retryWrites=true&w=majority"
app.use('/user',userRoutes);
app.use('/questions',questionRoutes)
app.use("/answer", answersRoutes);
const PORT = process.env.PORT || 8000

const DATABASE_URL=process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`)
    }))
    .catch((err)=>{
        console.log(err.message)
    })
