import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import axios from "../../axios/axios";
import { ChatType } from "../../types/chat";

const socket = io("http://localhost:3000");


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { providerId, participantName, isProvider } = location.state || {};
    const user = useSelector((state: RootState) => state.user.user);
  
const userId=user?.id
console.log(userId,providerId,"--------------------")

  useEffect(() => {
    // Fetch chat history
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`/chatHistory?participantId=${participantId}&isProvider=${isProvider}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    // Listen for incoming messages
    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [providerId, isProvider]);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        sender: isProvider ? providerId : userId,
        receiver: isProvider ? userId : providerId,
        message: message,
        time: new Date().toISOString(),
      };

      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setMessage("");

      // Save message
      axios.post("/saveChatMessage", messageData);
    }
  };

  return (
    <div className="chat-container">
      <h3>Chat with {participantName}</h3>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
            <span>{new Date(msg.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
