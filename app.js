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
import schedulerouter from './routes/ScheduleRoutes.js';
import cookieParser from 'cookie-parser';
import {server, app} from './socket/socket.js'
import authRoute from "./routes/chat/authRoute.js"
import messageRoute from "./routes/chat/messageRoute.js"
import userChatRoute from "./routes/chat/userChatRoute.js"
dotenv.config();

const __dirname = path.resolve();
// const app = express();
// const server = http.createServer(app);

let users = {};

// Socket.IO setup
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//   },
// });



 




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


app.use(cookieParser())
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/dist')));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/minister', router);
app.use('/api/notification', notification);
app.use('/api/schedules', schedulerouter)
app.post('/api/minister/:id/appointment', bookAppointment)

app.get('/api/minister/:id/appointments', getAppointments);

app.put('/api/appointments/:appointmentId', updateAppointment)


app.use("/chat/auth", authRoute)
app.use("/chat/messages", messageRoute)
app.use("/chat/users", userChatRoute)
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
