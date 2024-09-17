import { Router } from "express";
import { allMessages, createMessage } from "../controllers/messageControllers.js";

let messageRouter=Router()

messageRouter.post("/",createMessage)
messageRouter.route("/:chatId").get(allMessages)

export default messageRouter;