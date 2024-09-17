import React from 'react'
import { Chatusers } from './Chatusers'
import { ChatWindow } from './ChatWindow.jsx'
import Chatnav from './Chatnav'
import { ChatState } from '../context/ChatContext.jsx'
import { Box } from '@chakra-ui/react'

export const ChatBox = () => {
  let {user}=ChatState();
  console.log("user",user);
  return (
    <div>
        {user && <Chatnav/>}
        <Box display={"flex"}>
          {user && <Chatusers/>}
          {user && <ChatWindow/>}
        </Box>
    </div>
  )
}
