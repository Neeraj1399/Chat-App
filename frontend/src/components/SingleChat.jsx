import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatContext";
import {
  Box,
  IconButton,
  Text,
  useToast,
  FormControl,
  Input,
  Flex,
} from "@chakra-ui/react";
import { getuserFull, getuserName } from "../config/Chatlogics";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";

const SingleChat = () => {
  let { user, selectedChat, setSelectedChat } = ChatState();
  let [loading, setLoading] = useState(false);
  let toast = useToast();
  let [messageValue, setMessageValue] = useState("");
  let [messages, setMessages] = useState([]);
  console.log("selectedChat", selectedChat);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(
        `http://localhost:3000/api/v1/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error fetching messages",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && messageValue) {
      try {
        setLoading(true);
        let config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        let data1 = {
          content: messageValue,
          chat: selectedChat._id,
        };
        setMessageValue("");
        let { data } = await axios.post(
          "http://localhost:3000/api/v1/message",
          data1,
          config
        );
        setMessages([...messages, data]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error sending message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const setMessagesHandler = (e) => {
    setMessageValue(e.target.value);
  };

  return (
    <>
      {!selectedChat ? (
        <Box
          display="flex"
          justifyContent="space-between"
          p={3}
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Text fontSize="1.5em">Select user to start chatting</Text>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            p={3}
            borderColor="gray.200"
            alignItems="center"
          >
            <Text fontSize="1em" fontWeight="500">
              {selectedChat.isGroupChat
                ? selectedChat.chatName.toUpperCase()
                : getuserName(user.data._id, selectedChat.users).toUpperCase()}
            </Text>
            {selectedChat.isGroupChat ? (
              <IconButton icon={<ViewIcon />} />
            ) : (
              <ProfileModal
                user={getuserFull(user.data._id, selectedChat.users)}
              >
                <IconButton icon={<ViewIcon />} />
              </ProfileModal>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="80vh"
            borderColor="gray.200"
          >
            <ScrollableFeed>
              {Array.isArray(messages) &&
                messages.length > 0 &&
                messages.map((msg, index) => (
                  <Flex
                    key={index}
                    justify={
                      msg.sender && msg.sender._id === user._id
                        ? "flex-end"
                        : "flex-start"
                    }
                    mb={2}
                  >
                    <Box
                      bg={
                        msg.sender && msg.sender._id === user._id
                          ? "blue.500"
                          : "gray.200"
                      }
                      color={
                        msg.sender && msg.sender._id === user._id
                          ? "white"
                          : "black"
                      }
                      borderRadius="lg"
                      p={3}
                      m={2}
                      maxWidth="75%"
                      alignSelf={
                        msg.sender && msg.sender._id === user._id
                          ? "flex-end"
                          : "flex-start"
                      }
                      boxShadow="md"
                    >
                      <Text>{msg.content}</Text>
                    </Box>
                  </Flex>
                ))}
            </ScrollableFeed>
            <FormControl mt={3} as="form">
              <Input
                value={messageValue}
                onChange={setMessagesHandler}
                onKeyDown={sendMessage}
                placeholder="Enter a message"
                autoComplete="off"
              />
            </FormControl>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;

// import React, { useEffect, useState } from "react";
// import { ChatState } from "../context/ChatContext";
// import {
//   Box,
//   IconButton,
//   Text,
//   useToast,
//   FormControl,
//   Input,
// } from "@chakra-ui/react";
// import { getuserFull, getuserName } from "../config/Chatlogics";
// import { ViewIcon } from "@chakra-ui/icons";
// import ProfileModal from "./ProfileModal";
// import axios from "axios";
// import ScrollableFeed from "react-scrollable-feed";

// const SingleChat = () => {
//   let { user, selectedChat, setSelectedChat } = ChatState();
//   let [loading, setLoading] = useState(false);
//   let toast = useToast();
//   let [messageValue, setMessageValue] = useState("");
//   let [messages, setMessages] = useState([]);
//   console.log("selectedChat", selectedChat);

//   const fetchMessages = async () => {
//     if (!selectedChat) return;
//     try {
//       let config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       let { data } = await axios.get(
//         `http://localhost:3000/api/v1/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//     } catch (error) {
//       setLoading(false);
//       toast({
//         title: "Error fetching messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [selectedChat]);

//   const sendMessage = async (e) => {
//     if (e.key === "Enter" && messageValue) {
//       try {
//         setLoading(true);
//         let config = {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         let data1 = {
//           content: messageValue,
//           chat: selectedChat._id,
//         };
//         setMessageValue("");
//         let { data } = await axios.post(
//           "http://localhost:3000/api/v1/message",
//           data1,
//           config
//         );
//         setMessages([...messages, data]);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         toast({
//           title: "Error sending message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     }
//   };

//   const setMessagesHandler = (e) => {
//     setMessageValue(e.target.value);
//   };

//   return (
//     <>
//       {!selectedChat ? (
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           p={3}
//           borderBottom="1px"
//           borderColor="gray.200"
//         >
//           <Text fontSize="1.5em">Select user to start chatting</Text>
//         </Box>
//       ) : (
//         <>
//           {selectedChat.isGroupChat ? (
//             <Box>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 p={3}
//                 borderColor="gray.200"
//                 alignItems="center"
//               >
//                 <Text fontSize="1em" fontWeight="500">
//                   {selectedChat.chatName.toUpperCase()}
//                 </Text>
//                 <IconButton icon={<ViewIcon />} />
//               </Box>
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="space-between"
//                 height="80vh"
//                 borderColor="gray.200"
//               >
//                 <ScrollableFeed>
//                   {messages.map((msg, index) => (
//                     <Box key={index}>
//                       {/* Render message here */}
//                       <Text>{msg.content}</Text>
//                     </Box>
//                   ))}
//                 </ScrollableFeed>
//                 <FormControl mt={3}>
//                   <Input
//                     value={messageValue}
//                     onChange={setMessagesHandler}
//                     onKeyDown={sendMessage}
//                     placeholder="Enter a message"
//                   />
//                 </FormControl>
//               </Box>
//             </Box>
//           ) : (
//             <Box>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 p={3}
//                 borderColor="gray.200"
//                 alignItems="center"
//               >
//                 <Text fontSize="1em" fontWeight="500">
//                   {getuserName(user.data._id, selectedChat.users).toUpperCase()}
//                 </Text>
//                 <ProfileModal
//                   user={getuserFull(user.data._id, selectedChat.users)}
//                 >
//                   <IconButton icon={<ViewIcon />} />
//                 </ProfileModal>
//               </Box>
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="space-between"
//                 height="80vh"
//                 borderColor="gray.200"
//               >
//                 <ScrollableFeed>
//                   {messages.map((msg, index) => (
//                     <Box key={index}>
//                       {/* Render message here */}
//                       <Text>{msg.content}</Text>
//                     </Box>
//                   ))}
//                 </ScrollableFeed>
//                 <FormControl mt={3}>
//                   <Input
//                     value={messageValue}
//                     onChange={setMessagesHandler}
//                     onKeyDown={sendMessage}
//                     placeholder="Enter a message"
//                   />
//                 </FormControl>
//               </Box>
//             </Box>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default SingleChat;
