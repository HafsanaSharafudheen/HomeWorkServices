import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utilities/axios";
import Header from "../../../User/components/Header";
import Footer from "../../../User/components/Footer";
import "./ChatList.css";
import { ChatType } from "../../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import ServiceSidebar from "../../../ServiceProvider/serviceSidebar";
import ServiceNavbar from "../../../ServiceProvider/ServiceNavbar";
import socket from "../../../utilities/socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const defaultImage = "../../../assets/images/DefaultImage";

const ChatList: React.FC<{ isProvider: boolean }> = ({ isProvider }) => {
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [fromProvider, setFromProvider] = useState<boolean>(false);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const loggedInUserId = user?.id;

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const endpoint = isProvider ? `/providerChatList` : `/userChatList`;
        const response = await axios.get<{ chats: ChatType[]; fromProvider: boolean }>(endpoint);

        const groupedChats = Array.from(
          response.data.chats.reduce((map, chat) => {
            const [field1, field2] = [chat.receiver, chat.sender].sort();
            const key = `${field1}_${field2}`;
            map.set(key, chat);
            return map;
          }, new Map()).values()
        );

        setChatList(groupedChats);
        setFromProvider(response.data.fromProvider);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();

    socket.on("receiveMessage", (data: ChatType) => {
      if (data.receiver === loggedInUserId) {
        console.log(data.userName,"username",data)
        const senderName = data.userName || "Unknown";

        // Show notification using react-toastify
        toast.info(`New message from ${senderName}: ${data.message}`);

        setChatList((prevChatList) =>
          prevChatList.map((chat) =>
            chat.sender === data.sender
              ? { ...chat, message: data.message, createdAt: data.createdAt }
              : chat
          )
        );
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [loggedInUserId, isProvider]);

  const handleChatClick = async (id: string, fullName: string,profilePicture: string) => {
    try {
      const markAsRead = await markMessagesAsRead(id, loggedInUserId);
      navigate("/messages", {
        state: { providerId: id, participantName: fullName, isProvider, markAsRead,profilePicture },
      });
    } catch (error) {
      console.error("Error handling chat click:", error);
    }
  };

  const markMessagesAsRead = async (providerId: string, userId: string) => {
    try {
      const response = await axios.post("/markAsRead", {
        sender: providerId,
        receiver: userId,
      });
      return response.data.markAsRead;
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const renderChatList = () => {
    return chatList.length ? (
      <ul className="chat-list">
        {chatList.map(({ senderDetails, receiverDetails, message, createdAt }) => {
          const isLoggedInUserReceiver = receiverDetails._id === loggedInUserId;
          const participantDetails = isLoggedInUserReceiver ? senderDetails : receiverDetails;

          if (!participantDetails) {
            console.warn("Participant details are missing for chat:");
            return null;
          }

          return (
            <li
              key={participantDetails._id}
              className="chat-list-item"
              onClick={() =>
                participantDetails._id && participantDetails.fullName
                  ? handleChatClick(participantDetails._id, participantDetails.fullName,participantDetails.profilePicture,)
                  : console.warn("Participant details are incomplete")
              }
            >
              <div className="chat-participant">
                <div className="chat-participant-info">
                <img
      src={
        participantDetails.profilePicture
          ? `${import.meta.env.VITE_API_BASEURL}${participantDetails.profilePicture}`
          : defaultImage
      }
      alt="Profile"
      className="participant-profile-img"
    />
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
    );
  };

  return (
    <div className="chat-list-page">
      {isProvider ? (
        <div className="row">
          <ServiceNavbar />
          <div className="col-md-4">
            <ServiceSidebar />
          </div>
          <div className="col-md-8">
            <div className="chat-list-container provider-view">
              <h3 className="headingStyle">Your Connections</h3>
              {renderChatList()}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className="chat-list-container user-view">
            <h3>Your Providers</h3>
            {renderChatList()}
          </div>
          <Footer />
        </>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default ChatList;
