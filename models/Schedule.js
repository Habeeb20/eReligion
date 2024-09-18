import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    userId :mongoose.Schema.Types.ObjectId,
    date:Date,
    time:String,
    meetingLink:String,
})


export default mongoose.model('Schedule', ScheduleSchema);
