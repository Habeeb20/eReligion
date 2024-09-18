import mongoose from "mongoose";
// MongoDB Schema for User Meetings
const meetingSchema = new mongoose.Schema({
    senderEmail: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    meetLink: { type: String, required: true },
})

const Meeting = mongoose.model('Meeting', meetingSchema);
export default Meeting  