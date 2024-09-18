import React from "react"
import userAvatar from "../../assets/user.png"
import { useAuthContext } from "../../context/AuthContext"
import useConversation from "../../zustand/useConversation"
import { formatTime } from "../../utils/formatTime"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()

  const messageFromMe = message.senderId === authUser._id

  const chatClassName = messageFromMe ? "justify-end" : "justify-start"

  const profilePic = messageFromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic || userAvatar

  const msgBgColor = messageFromMe ? "bg-green-500" : "bg-white text-indigo-900"

  const formattedTime = formatTime(message.createdAt)

  return (
    <div className={`flex items-start ${chatClassName} py-2`}>
      {/* Profile picture */}
      {!messageFromMe && (
        <div className="mr-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-500">
            <img src={profilePic} alt="User Avatar" />
          </div>
        </div>
      )}

      {/* Message bubble */}
      <div className={`max-w-xs lg:max-w-md p-3 mt-4 rounded-lg ${msgBgColor} shadow-md`}>
        <p className={`text-sm leading-relaxed ${messageFromMe ? 'text-white' : 'text-indigo-900 '}`}>
          {message.message}
        </p>
        <div className="text-xs mt-1 text-white-500 text-right">
          {formattedTime}
        </div>
      </div>

      {/* Spacer for sent messages */}
      {messageFromMe && (
        <div className="ml-2">
          <div className="w-10 h-10 mt-4 rounded-full overflow-hidden border border-indigo-500">
            <img src={profilePic} alt="User Avatar" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
