import React, { useEffect } from "react";
import userAvatar from "../../assets/user.png";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import useUnreadCount from "../../hooks/useUnreadCount";
import useMarkMessagesAsRead from "../../hooks/useMarkMessagesAsRead";

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const unreadCount = useUnreadCount(conversation._id); // Fetch unread message count
  const markMessagesAsRead = useMarkMessagesAsRead(conversation._id);

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    setSelectedConversation(conversation);
    markMessagesAsRead(); // Mark messages as read when conversation is selected
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic || userAvatar} alt="" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-slate-700">{conversation.username}</p>
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount}</span>
            )}
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
