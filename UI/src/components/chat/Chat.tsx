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
  const { providerId, participantName, isProvider,markAsRead } = location.state || {};
  const user = useSelector((state: RootState) => state.user.user);

  const userId = user?.id;

  useEffect(() => {
  
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `/chatHistory?providerId=${providerId}&isProvider=${isProvider}`
        );
        setMessages(response.data.messages);
         await markMessagesAsRead();

        
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    
    const markMessagesAsRead = async () => {
      try {
        await axios.post("/markAsRead", {
          sender: providerId,
          receiver: userId,
        });
  
        setMessages((prev) =>
          prev.map((msg) =>
            msg.sender === providerId ? { ...msg, read: true } : msg
          )
        );
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    };
  

    fetchChatHistory();


    socket.on("receiveMessage", async (data: ChatType) => {
      
      if(data.receiver == userId){ 
        setMessages((prev) => [...prev, data]);
        await markMessagesAsRead();
      }
      // Mark the received message as read if this chat is active
      // if (data.sender === providerId) {
      //   markMessagesAsRead();
      // }
      if(data.receiver == userId){
        socket.emit("messageRead", { messageId: data._id, readerId: data.sender });
      }
      }
    );

    socket.on("messageReadAck", async (data: { messageId: string; readerId: string }) => {
      console.log("messageReadAck", data);
      
      if(data.readerId == userId){
        console.log(messages)

        console.log('messageReadAck---- read show')

        await fetchChatHistory();

      // setMessages((prevMessages) =>
      //     prevMessages.map((message) =>
      //       message._id === data.messageId
      //         ? {
      //             ...message,
      //             read: true, // Set isRead to true
      //             //readBy: [...(message.readBy || []), data.readerId], // Update the readBy array
      //           }
      //         : message
      //     )
      //   );
        console.log(messages)
     }
      
      
    });

    

    return () => {
      socket.off("receiveMessage");
      socket.off("messageReadAck");
    };
  }, [providerId, isProvider, userId]);

  const sendMessage = () => {

    const uniqueId = crypto.randomUUID();
    if (input.trim()) {
      const messageData = {
        sender:  userId,
        receiver: providerId,
        message:input,
        createdAt: new Date().toISOString(),
        read: false, // Default to unread
      };


      setInput("");
      axios.post("/saveChatMessage", messageData);

      messageData._id = uniqueId.toString();
      setMessages((prevMessages) => [...prevMessages, messageData]);
      socket.emit("sendMessage", messageData);

      console.log("AFTER SET",messages)
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
            <span className="messageTime">{formatTime(msg.createdAt)}</span>
      {msg.sender === userId && (
        <BiCheckDouble
          className={msg.read ? "double-tick-read" : "double-tick-unread"}
        />
      )}

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
