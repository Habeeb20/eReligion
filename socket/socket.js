import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
app.use((req, res, next) => {
  req.io = io;
  next();
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // Ensure `users` is defined here, renamed as `userSocketMap`

// Helper function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  // If a valid userId is provided
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Remove the duplicate disconnect listener
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // // Real-time meeting scheduling
  // socket.on("schedule_meeting", (data) => {
  //   const { recipientId, meetingDetails } = data;
  //   // Notify the recipient in real-time
  //   const recipientSocketId = userSocketMap[recipientId];
  //   if (recipientSocketId) {
  //     io.to(recipientSocketId).emit("meeting_notification", meetingDetails);
  //   }
  // });

  // // Join room
  // socket.on("join-room", (roomID) => {
  //   socket.join(roomID);
  //   console.log(`${socket.id} joined room: ${roomID}`);
  //   socket.to(roomID).emit("user-connected", socket.id); // Notify others in the room
  // });

  // // Handle offer/answer exchange
  // socket.on("send-offer", (data) => {
  //   socket.to(data.room).emit("receive-offer", data.offer);
  // });

  // socket.on("send-answer", (data) => {
  //   socket.to(data.room).emit("receive-answer", data.answer);
  // });

  // // Handle ICE candidates
  // socket.on("send-ice-candidate", (data) => {
  //   socket.to(data.room).emit("receive-ice-candidate", data.candidate);
  // });

  // // Notify all users when an appointment is accepted
  // socket.on("appointmentAccepted", (data) => {
  //   io.emit("notification", data); // Broadcast to all users
  // });

  // // Register user and map their socket ID
  // socket.on("registerUser", (userId) => {
  //   userSocketMap[userId] = socket.id;
  // });

  // // Handle booking appointment
  // socket.on("book-appointment", (data) => {
  //   const { ministerId, userId, appointmentDetails } = data;

  //   // Notify minister of the new appointment
  //   const ministerSocketId = userSocketMap[ministerId];
  //   if (ministerSocketId) {
  //     io.to(ministerSocketId).emit("notification", {
  //       message: `New appointment request from User ${userId}`,
  //       type: "appointmentRequest",
  //       details: appointmentDetails,
  //     });
  //   }
  // });

  // // Minister accepts or rejects appointment
  // socket.on("appointment-response", (data) => {
  //   const { userId, response, appointmentDetails, ministerId } = data;

  //   // Notify user of minister's response
  //   const userSocketId = userSocketMap[userId];
  //   if (userSocketId) {
  //     io.to(userSocketId).emit("notification", {
  //       message: `Minister ${ministerId} has ${response} your appointment`,
  //       type: "appointmentResponse",
  //       response,
  //       details: appointmentDetails,
  //     });
  //   }
  // });

  // // Handle disconnection and cleanup
  // socket.on("disconnect", () => {
  //   console.log("User disconnected:", socket.id);
  //   for (let userId in userSocketMap) {
  //     if (userSocketMap[userId] === socket.id) {
  //       delete userSocketMap[userId];
  //     }
  //   }
  //   io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated list after disconnect
  // });
});

export { app, server, io };
