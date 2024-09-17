import Notification from "../models/NotificationSchema.js";
import express from "express"
const router = express.Router()
// socket.on('book-appointment', async (data) => {
//     const { ministerId, userId, appointmentDetails } = data;
  
//     const newNotification = new Notification({
//       userId: ministerId,
//       message: `New appointment request from User ${userId}`,
//       type: 'appointmentRequest',
//       details: appointmentDetails,
//     });
  
//     await newNotification.save();  // Store the notification in the database
  
//     // Emit real-time notification
//     if (users[ministerId]) {
//       io.to(users[ministerId]).emit('notification', {
//         message: `New appointment request from User ${userId}`,
//         type: 'appointmentRequest',
//         details: appointmentDetails,
//       });
//     }
//   });

  router.get('/:userId', async (req, res) => {
    try {
      const notifications = await Notification.find({ userId: req.params.userId });
      res.json({ notifications });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching notifications' });
    }
  });
  
  export default router;
  