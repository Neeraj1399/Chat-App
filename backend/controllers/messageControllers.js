import expressAsyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";


export const createMessage=expressAsyncHandler(async(req,res)=>{
    const {content,chat}=req.body
    if(!content || !chat){
        return res.status(400).json({
            status:"fail",
            message:"Invalid data"
        })
    }
    try {
        let message=await Message.create({
            sender:req.userId,
            chat:chat,
            content:content
        })
        message=await message.populate("sender","name email photo")
        message=await message.populate("chat")

        message=await message.populate({
            path:"chat.users",
            select:"name email photo"
        })

        await Chat.findByIdAndUpdate(chat,{
            latestMessage:message
        })
        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

export const allMessages=expressAsyncHandler(async(req,res,next)=>{
    try {
        let messages=await Message.find({chat:req.params.chatId})
        .populate("sender","name email photo")
        .populate("chat")
        res.json(messages)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})