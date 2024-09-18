import React from "react"
import Sidebar from "../component/sidebar/Sidebar"
import MessageContainer from "../component/messages/MessageContainer"

const ChatHome = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-200 mt-16">
      <Sidebar />

      <MessageContainer />
    </div>
  )
}

export default ChatHome
