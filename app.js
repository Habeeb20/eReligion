import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './database.js'; // Make sure to include .js extension
import colors from "colors"
import userRoutes from "./routes/userRoute.js"
dotenv.config();
import { ExpressPeerServer } from 'peer';
import { createServer } from 'http';
import router from './routes/ministerRoute.js';




const app = express();
const server = createServer(app);



const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
});

app.use('/peerjs', peerServer);



// Establish database connection
const startServer = async () => {
    try {
        await connectDb();
        console.log(`Database connected successfully`.bgYellow.black);
    } catch (error) {
        console.error(`Database connection failed`.bgRed.white, error);
        process.exit(1); 
    }

    app.use(cors());
    app.use(express.json());
    app.use('/api/users', userRoutes);
    app.use('/api/minister', router )

    const port = process.env.PORT || 9000;

    app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`.bgGreen.black);
    });
};

startServer();
