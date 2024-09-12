
import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
  comment: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
});

const meetingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  isMinister: Boolean,
  ministryName: String,
  religion:String,
  address: String,
  state:String,
  LGA:String,
  reviews: [reviewSchema], // To store reviews and comments
  scheduledMeetings: [
    {
      date: Date,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ], // To store scheduled meetings for ministers
});

export default mongoose.model('Minister', meetingSchema);
