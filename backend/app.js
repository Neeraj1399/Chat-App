import express from 'express'
import { db } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './Routes/userRoutes.js'
import chatRouter from './Routes/chatRoutes.js'
import { globalErrorHandler } from './middlewares/globalErrorHandler.js'
import messageRouter from './Routes/messageRoutes.js'
dotenv.config()
db()
let app=express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//users
app.use("/api/v1/user",userRouter)
app.use("/api/v1/chat",chatRouter)
app.use("/api/v1/message",messageRouter)

app.all("*",(req,res,next)=>{
    let err=new Error(`Page not found ${req.originalUrl}`)
    err.statusCode=404
    next(err)
})

app.use(globalErrorHandler)


export default app;
