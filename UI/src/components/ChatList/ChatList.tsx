import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import Header from "../Header";
import Footer from "../Footer";
import "./ChatList.css";
import { ChatType } from "../../types/chat";

const ChatList: React.FC<{ isProvider: boolean }> = ({ isProvider }) => {
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [fromProvider, setFromProvider] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const endpoint = isProvider ? `/providerChatList` : `/userChatList`;
        const response = await axios.get<{ chats: ChatType[]; fromProvider: boolean }>(endpoint);

        // Group chats by receiver ID
        const groupedChats = Object.values(
          response.data.chats.reduce((acc: Record<string, ChatType>, chat: ChatType) => {
            acc[chat.receiver] = chat; // Keep the latest message for each receiver
            return acc;
          }, {})
        );

        setChatList(groupedChats);
        setFromProvider(response.data.fromProvider); // Set the fromProvider flag dynamically
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, [isProvider]);

  const handleChatClick = (id: string, fullName: string) => {
    navigate("/messages", {
      state: { providerId: id, participantName: fullName, isProvider },
    });
  };

  return (
    <>
      <Header />
      <div className="chat-list-container">
        <h3>{isProvider ? "Your Users" : "Your Providers"}</h3>
        {chatList.length ? (
          <ul className="chat-list">
            {chatList.map(({ senderDetails, receiverDetails, message, createdAt }) => {
              const participantDetails = fromProvider ? senderDetails : receiverDetails;
              return (
                <li
                key={participantDetails?._id }
                className="chat-list-item"
                onClick={() =>
                  participantDetails?._id && participantDetails?.fullName
                    ? handleChatClick(participantDetails._id, participantDetails.fullName)
                    : console.warn("Participant details are incomplete")
                }
              >
              
                  <div className="chat-participant">
                    <img
                      src={participantDetails.profilePicture || "default-profile.png"}
                      alt={participantDetails.fullName}
                      className="chat-participant-image"
                    />
                    <div className="chat-participant-info">
                      <h4>{participantDetails.fullName}</h4>
                      <p className="last-message">{message}</p>
                    </div>
                    <p className="message-time">
                      {new Date(createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No chats available</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ChatList;
