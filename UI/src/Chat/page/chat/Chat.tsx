import React, { useEffect, useState } from "react";
import socket from '../../../utilities/socket'; // Import the socket instance

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import axios from "../../../utilities/axios";
import { ChatType } from "../../types/chat";
import { BiCheckDouble } from "react-icons/bi"; // Import double tick icon
import './Chat.css'
import Footer from "../../../User/components/Footer";
import Header from "../../../User/components/Header";
import ServiceSidebar from "../../../ServiceProvider/serviceSidebar";
import ServiceHeading from "../../../ServiceProvider/ServiceProviderDashboard/ServiceHeader";
import ServiceNavbar from "../../../ServiceProvider/ServiceNavbar";
const defaultImage ='../../../assets//images//DefaultImage.avif'
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [input, setInput] = useState("");
  const location = useLocation();
  const { providerId, participantName, isProvider,profilePicture } = location.state || {};
  const user = useSelector((state: RootState) => state.user.user);

  const userId = user?.id;
  const userName=user?.fullName

  useEffect(() => {
  
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `/chatHistory?providerId=${providerId}&isProvider=${isProvider}`
        );
        setMessages(response.data.messages);
         await markMessagesAsRead();
         socket.emit("messageReadByP2P", {sender: providerId, receiver: userId});

        
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

    // sender`s window (if other person red messages then it will trigger)
    socket.on("messageReadByP2PAck", async (data: { sender: string; receiver: string }) => {
      console.log("messageReadByP2PAck", data);
      if(data.sender == userId && data.receiver == providerId){
        setMessages((prev) =>
          prev.map((msg) =>
            msg.sender === userId && data.receiver == providerId ? { ...msg, read: true } : msg
          )
        );      }
     });
    

    return () => {
      socket.off("receiveMessage");
      socket.off("messageReadAck");
      socket.off("messageReadByP2PAck");

    };
  }, [providerId, isProvider, userId]);

  const sendMessage = () => {

    const uniqueId = crypto.randomUUID();
    if (input.trim()) {
      const messageData = {
        sender:  userId,
        receiver: providerId,
        message:input,
        userName:userName,
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
    <div>
    {isProvider ? (
      <div className="row">
          <ServiceNavbar />

      
<div className="row">


    <div className="col-md-3">
    <ServiceSidebar />

    </div>
    <div className="col-md-9">

   
          <div className="chat-container">
            <div className="chat-header">
              <div className="participant-info">
                <img
                  src={
                    profilePicture
                      ? `${import.meta.env.VITE_API_BASEURL}${profilePicture}`
                      : defaultImage
                  }
                  alt="Profile"
                  className="participant-profile-img"
                />
                <h6>{participantName}</h6>
              </div>
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
          </div>
        </div>
      </div>
    ) : (
      <>
        <Header />
        <div className="chat-container">
          <div className="chat-header">
            <div className="participant-info">
              <img
                src={
                  profilePicture
                    ? `${import.meta.env.VITE_API_BASEURL}${profilePicture}`
                    : defaultImage
                }
                alt="Profile"
                className="participant-profile-img"
              />
              <h6>{participantName}</h6>
            </div>
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
        <Footer />
      </>
    )}
  </div>
);
};

export default Chat;
