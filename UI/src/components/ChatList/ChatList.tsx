import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import Header from '../Header';
import Footer from "../Footer";
import './ChatList.css'
import { ChatType } from "../../types/chat";

const ChatList: React.FC<{ isProvider: boolean }> = ({ isProvider }) => {
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const endpoint = isProvider
          ? `/providerChatList`
          : `/userChatList`;
        const response = await axios.get(endpoint);
        setChatList(response.data.chats || []);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, [isProvider]);

  const handleChatClick = (participant: Chat) => {
    navigate("/messages", {
      state: { participantId: participant.receiverDetails?._id, participantName: participant.fullName, isProvider },
    });
  };

  return (
    <>
    <Header/>
    <div className="chat-list-container">
      <h3>{isProvider ? "Your Users" : "Your Providers"}</h3>
      {chatList.length ? (
        <ul className="chat-list">
          {chatList.map((participant) => (
            <li
              key={participant.id}
              className="chat-list-item"
              onClick={() => handleChatClick(participant)}
            >
              <div className="chat-participant">
                <img
                  src={participant.receiverDetails.image || "default-profile.png"}
                  alt={participant.receiverDetails.fullName}
                  className="chat-participant-image"
                />
                <div className="chat-participant-info">
                  <h4>{participant.receiverDetails.fullName}</h4>
                  <p className="last-message">{participant.message}</p>
                </div>
                <p className="message-time">
                  {new Date(participant.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats available</p>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ChatList;
