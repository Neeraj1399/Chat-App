import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Toast } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ChatState } from "../context/ChatContext";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = ChatState();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    let { data } = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    toast({
      title: "Login successful",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate("/chats", { replace: true });
  };
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="name"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit" colorScheme="blue" marginTop="1em">
          Login
        </Button>
      </form>
    </div>
  );
};

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, Input, Toast } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/react";
// import { ChatState } from "../context/ChatContext";
// export const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { user, setUser } = ChatState();
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);

//     let { data } = await axios.post(
//       "http://localhost:3000/api/v1/user/login",
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//     toast({
//       title: "Login successful",
//       status: "success",
//       duration: 9000,
//       isClosable: true,
//     });
//     navigate("/chats", { replace: true });
//   };
//   return (
//     <div className="login-form">
//       <form onSubmit={handleSubmit}>
//         <h1>Login</h1>
//         <label htmlFor="email">Email</label>
//         <Input
//           type="email"
//           name="email"
//           id="name"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         />
//         <label htmlFor="password">Password</label>
//         <Input
//           type="password"
//           name="password"
//           id="password"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//         />
//         <Button type="submit" colorScheme="blue" marginTop="1em">
//           Login
//         </Button>
//       </form>
//     </div>
//   );
// };
