import express from "express"
import Schedule from "../models/Schedule.js"
import {google} from "googleapis"
import Meeting from "../models/MeetingSchema.js";
const schedulerouter = express.Router();

const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
const calendar = google.calendar({version: 'v3', auth: oauth2Client})


schedulerouter.post("/schedule", async(req, res) => {
    const {userId, date, time, recipientEmail} = req.body;

    try {
        const event = {
            summary: 'Google Meet Meeting',
            start: { dateTime: new Date(`${date}T${time}`).toISOString() },
            end: { dateTime: new Date(new Date(`${date}T${time}`).getTime() + 60 * 60 * 1000).toISOString() },
            attendees:[{email: recipientEmail}],
            conferenceData: { createRequest: { requestId: 'sample123', conferenceSolutionKey: { type: 'hangoutsMeet' } } },
        };
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1,
        });
        const meetingLink = response.data.conferenceData.entryPoints[0].uri;
        const schedule = new Schedule({ userId, date, time, meetingLink });
        const message= "meeting scheduled successfully"
        await schedule.save();
        res.status(201).json({ meetingLink, message });

    } catch (error) {
        res.status(400).json({ error: err.message });
    }
});

schedulerouter.get('/schedule/:recipientEmail', async (req, res) => {
    const { recipientEmail } = req.params;

    try {
        const meetings = await Schedule.find({ recipientEmail });
        res.status(200).json({ meetings });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching meetings' });
    }
});


schedulerouter.post('/meeting', async(req, res) => {
    const { senderEmail, recipientEmail, date, time, meetLink } = req.body;

  try {
    const newMeeting = new Meeting({ senderEmail, recipientEmail, date, time, meetLink });
    await newMeeting.save();

    res.json({ success: true, meetLink });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error scheduling meeting' });
  }
})

schedulerouter.get('/meetings/:email', async(req, res) => {
    const recipientEmail = req.params.email;

    try {
      const meetings = await Meeting.find({ recipientEmail });
      res.json({ success: true, meetings });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching meetings' });
    }
})


export default schedulerouter;