import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './database.js'; // Ensure correct path and extension
import colors from 'colors';
import userRoutes from './routes/userRoute.js';
import { ExpressPeerServer } from 'peer';
import { createServer } from 'http';
import router from './routes/ministerRoute.js';
import path from 'path';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io'; // Correct import
import notification from "./routes/Notification.js";
import { bookAppointment, getAppointments, updateAppointment } from './controllers/AppointmentBooking.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);

let users = {};

// Socket.IO setup
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Allowing CORS for testing, restrict it in production.
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle joining a room
  socket.on('join-room', (roomID) => {
    socket.join(roomID);
    console.log(`${socket.id} joined room: ${roomID}`);
    socket.to(roomID).emit('user-connected', socket.id); // Notify other users in the room
  });

  socket.on('send-offer', (data) => {
    socket.to(data.room).emit('receive-offer', data.offer);
  });

  socket.on('send-answer', (data) => {
    socket.to(data.room).emit('receive-answer', data.answer);
  });

  socket.on('send-ice-candidate', (data) => {
    socket.to(data.room).emit('receive-ice-candidate', data.candidate);
  });

  // Notify all users of appointment acceptance
  socket.on('appointmentAccepted', (data) => {
    io.emit('notification', data); // Broadcast to all users
  });

  // Assign socket to a user (e.g., from token or login)
  socket.on('registerUser', (userId) => {
    users[userId] = socket.id; // Map userId to their socket
  });

  // Handle booking appointment
  socket.on('book-appointment', (data) => {
    const { ministerId, userId, appointmentDetails } = data;

    // Notify minister of new appointment
    if (users[ministerId]) {
      io.to(users[ministerId]).emit('notification', {
        message: `New appointment request from User ${userId}`,
        type: 'appointmentRequest',
        details: appointmentDetails,
      });
    }
  });

  // Minister accepts/rejects appointment
  socket.on('appointment-response', (data) => {
    const { userId, response, appointmentDetails, ministerId } = data;

    // Notify user of the minister's response
    if (users[userId]) {
      io.to(users[userId]).emit('notification', {
        message: `Minister ${ministerId} has ${response} your appointment`,
        type: 'appointmentResponse',
        response,
        details: appointmentDetails,
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Optionally, remove user from users list
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
      }
    }
  });
});

// Set up PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
});
app.use('/peerjs', peerServer);

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/dist')));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/minister', router);
app.use('/api/notification', notification);
app.post('/api/minister/:id/appointment', bookAppointment)
// server.js
app.get('/api/minister/:id/appointments', getAppointments);

app.put('/api/appointments/:appointmentId', updateAppointment)

// Database connection
const startServer = async () => {
  try {
    await connectDb();
    console.log(`Database connected successfully`.bgYellow.black);
  } catch (error) {
    console.error(`Database connection failed`.bgRed.white, error);
    process.exit(1);
  }

  const port = process.env.PORT || 9000;
  server.listen(port, () => { // Use `server.listen` to include Socket.IO
    console.log(`Your app is listening on port ${port}`.bgGreen.black);
  });
};

startServer();

// Catch-all route for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
