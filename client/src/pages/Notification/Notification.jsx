import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:9000');  // Connect to backend server

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Register user on the server with userId
    socket.emit('registerUser', userId);

    // Listen for notifications
    socket.on('notification', (data) => {
        console.log("Notification recieved")
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off('notification');
    };
  }, [userId]);

  return (
    <div className="notification-container">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <ul className="list-disc">
        {notifications.map((notif, index) => (
          <li key={index} className="p-2 border-b border-gray-300">
            <strong>{notif.message}</strong>
            <p>{notif.details ? JSON.stringify(notif.details) : ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
