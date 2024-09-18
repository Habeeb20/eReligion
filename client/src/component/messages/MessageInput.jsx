import React, { useState } from "react"
import { BsSend } from "react-icons/bs"
import useSendMessage from "../../hooks/useSendMessage"

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message) {
      return
    }

    await sendMessage(message)
    setMessage("")
  }

  return (
    <form className="px-4 py-2 w-full " onSubmit={handleSubmit}>
      <div className="relative flex items-center w-full">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-3 pr-10 bg-white border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800 focus:outline-none "
        >
          {loading ? (
            <div className="loading loading-spinner color-black text-indigo-600"></div>
          ) : (
            <BsSend className="text-2xl" />
          )}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
