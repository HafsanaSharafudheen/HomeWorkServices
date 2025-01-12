import React, { useEffect, useState } from "react";
import socket from '../../utilities/socket'; // Import the socket instance

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import axios from "../../utilities/axios";
import { ChatType } from "../../types/chat";
import { BiCheckDouble } from "react-icons/bi"; // Import double tick icon
import './Chat.css'


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [input, setInput] = useState("");
  const location = useLocation();
  const { providerId, participantName, isProvider } = location.state || {};
  const user = useSelector((state: RootState) => state.user.user);

  const userId = user?.id;

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `/chatHistory?providerId=${providerId}&isProvider=${isProvider}`
        );
        setMessages(response.data.messages);

        // Mark all messages as read
        await axios.post("/markAsRead", {
          sender: providerId,
          receiver: userId,
        });
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    socket.on("receiveMessage", (data: ChatType) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [providerId, isProvider, userId]);

  const sendMessage = () => {
    if (input.trim()) {
      const messageData = {
        sender:  userId,
        receiver: providerId,
        message:input,
        createdAt: new Date().toISOString(),
        read: false, // Default to unread
      };

      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setInput("");

      axios.post("/saveChatMessage", messageData);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat with {participantName}</h3>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === userId ? "logged-in-user" : "other-user"
            }`}
          >
            <p>{msg.message}</p>
            <span className="messageTime">
              {formatTime(msg.createdAt)}
              {msg.sender === userId && (
                <BiCheckDouble
                  className={`double-tick ${
                    msg.read ? "double-tick-read" : "double-tick-unread"
                  }`}
                />
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
