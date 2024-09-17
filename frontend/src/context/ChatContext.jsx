import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
useNavigate;

let ChatContext = createContext();

let ChatProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [selectedChat, setSelectedChat] = useState(null);
  let [chats, setChats] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log("user in context api", user);
    if (!user) {
      navigate("/", { replace: true });
    }
    setUser(user);
  }, []);

  return (
    <ChatContext.Provider
      value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export let ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
