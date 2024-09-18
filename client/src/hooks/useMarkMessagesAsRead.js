import React from 'react'

function useMarkMessagesAsRead(chatId) {
    const markAsRead = async() =>{
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat/messages/${chatId}/read`, {
            method:'PATCH'
        })
    }
  return markAsRead
}

export default useMarkMessagesAsRead
