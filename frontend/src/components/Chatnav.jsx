import {
  Avatar,
  Box,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserList from "./UserList";
import { ChatState } from "../context/ChatContext";

const Chatnav = () => {
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const toast = useToast();
  const btnRef = useRef();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const accessChat = async (id) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.post(
        `http://localhost:3000/api/v1/chat/`,
        { userId: id },
        config
      );
      console.log(data);
      // if chat already exists in chats no need to add it otherwise add it
      if (Array.isArray(chats) && chats?.find((chat) => chat._id === data._id))
        setChats([...chats, data]);
      setSelectedChat(data);
      setLoading(false);
      onDrawerClose();
    } catch (error) {
      toast({
        title: "Couldn't access chat",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      return toast({
        title: "Please enter something",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    try {
      setLoading(true);
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchUsers(data);
      setSearch("");
    } catch (error) {
      toast({
        title: "Couldn't get users",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding={"1em"}
      alignItems={"center"}
      boxShadow={"5px 5px 5px rgba(0,0,0,0.4)"}
    >
      <Button leftIcon={<SearchIcon />} ref={btnRef} onClick={onDrawerOpen}>
        Search
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" gap="1em">
              {" "}
              <Input
                placeholder="Search by name or email"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            <Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchUsers.map((user) => {
                  return (
                    <UserList
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  );
                })
              )}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Text>Chat app</Text>
      <Box
        display={"flex"}
        gap={"1em"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Menu>
          <MenuButton as={Button}>
            <BellIcon w={8} h={5} />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar name={user.data.name} src={user.data.photo} size={"sm"} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onModalOpen}>Profile</MenuItem>

            <Modal isOpen={isModalOpen} onClose={onModalClose}>
              <ModalOverlay />
              <ModalContent textAlign={"center"}>
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"1em"}
                >
                  <Text fontSize={"2xl"}>{user.data.email}</Text>
                  <Avatar
                    name={user.data.name}
                    src={user.data.photo}
                    size="2xl"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onModalClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <MenuDivider />
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Chatnav;

// import {
//   Avatar,
//   Box,
//   Button,
//   Text,
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   Input,
// } from "@chakra-ui/react";
// import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
// import { useRef, useState } from "react";
// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
// } from "@chakra-ui/react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
// import axios from "axios";
// import ChatLoading from "./ChatLoading";
// import UserList from "./UserList";
// import { ChatState } from "../context/ChatContext";

// const Chatnav = () => {
//   const [search, setSearch] = useState("");
//   const [searchUsers, setSearchUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
//   const {
//     isOpen: isDrawerOpen,
//     onOpen: onDrawerOpen,
//     onClose: onDrawerClose,
//   } = useDisclosure();
//   const {
//     isOpen: isModalOpen,
//     onOpen: onModalOpen,
//     onClose: onModalClose,
//   } = useDisclosure();
//   const toast = useToast();
//   const btnRef = useRef();
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/", { replace: true });
//   };

//   const accessChat = async (id) => {
//     try {
//       let config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       let { data } = await axios.post(
//         `http://localhost:5000/api/v1/chat/`,
//         { userId: id },
//         config
//       );
//       console.log(data);
//       // if chat already exists in chats no need to add it otherwise add it
//       if (Array.isArray(chats) && chats?.find((chat) => chat._id === data._id))
//       setChats([...chats, data]);
//       setSelectedChat(data);
//       setLoading(false);
//       onDrawerClose();
//     } catch (error) {
//       toast({
//         title: "Couldn't access chat",
//         description:error.message,
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleSearch = async () => {
//     if (!search) {
//       return toast({
//         title: "Please enter something",
//         status: "warning",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//     try {
//       setLoading(true);
//       let config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(
//         `http://localhost:5000/api/v1/user?search=${search}`,
//         config
//       );
//       setLoading(false);
//       setSearchUsers(data);
//       setSearch("");
//     } catch (error) {
//       toast({
//         title: "Couldn't get users",
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       });
//       setLoading(false);
//     }
//   };
//   return (
//     <Box
//       display="flex"
//       justifyContent="space-between"
//       padding={"1em"}
//       alignItems={"center"}
//       boxShadow={"5px 5px 5px rgba(0,0,0,0.4)"}
//     >
//       <Button leftIcon={<SearchIcon />} ref={btnRef} onClick={onDrawerOpen}>
//         Search
//       </Button>
//       <Drawer
//         isOpen={isDrawerOpen}
//         placement="left"
//         onClose={onDrawerClose}
//         finalFocusRef={btnRef}
//       >
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Search users</DrawerHeader>

//           <DrawerBody>
//             <Box display="flex" gap="1em">
//               {" "}
//               <Input
//                 placeholder="Search by name or email"
//                 onChange={(e) => setSearch(e.target.value)}
//                 value={search}
//               />
//               <Button onClick={handleSearch}>Go</Button>
//             </Box>
//             <Box>
//               {loading ? (
//                 <ChatLoading />
//               ) : (
//                 searchUsers.map((user) => {
//                   return (
//                     <UserList
//                       key={user._id}
//                       user={user}
//                       handleFunction={() => accessChat(user._id)}
//                     />
//                   );
//                 })
//               )}
//             </Box>
//           </DrawerBody>

//           <DrawerFooter>
//             <Button variant="outline" mr={3} onClick={onDrawerClose}>
//               Cancel
//             </Button>
//             <Button colorScheme="blue">Save</Button>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//       <Text>Chat app</Text>
//       <Box
//         display={"flex"}
//         gap={"1em"}
//         justifyContent={"space-between"}
//         alignItems={"center"}
//       >
//         <Menu>
//           <MenuButton as={Button}>
//             <BellIcon w={8} h={5} />
//           </MenuButton>
//         </Menu>
//         <Menu>
//           <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//             <Avatar name={user.data.name} src={user.data.photo} size={"sm"} />
//           </MenuButton>
//           <MenuList>
//             <MenuItem onClick={onModalOpen}>Profile</MenuItem>

//             <Modal isOpen={isModalOpen} onClose={onModalClose}>
//               <ModalOverlay />
//               <ModalContent textAlign={"center"}>
//                 <ModalHeader>Profile</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody
//                   display={"flex"}
//                   flexDirection={"column"}
//                   justifyContent={"center"}
//                   alignItems={"center"}
//                   gap={"1em"}
//                 >
//                   <Text fontSize={"2xl"}>{user.data.email}</Text>
//                   <Avatar
//                     name={user.data.name}
//                     src={user.data.photo}
//                     size="2xl"
//                   />
//                 </ModalBody>

//                 <ModalFooter>
//                   <Button colorScheme="blue" mr={3} onClick={onModalOpen}>
//                     Close
//                   </Button>
//                 </ModalFooter>
//               </ModalContent>
//             </Modal>
//             <MenuDivider />
//             <MenuItem onClick={logout}>Logout</MenuItem>
//           </MenuList>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default Chatnav;
