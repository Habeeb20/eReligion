
import mongoose from 'mongoose';
const ministerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  ministryname: { type: String, required: true },
  email:{type: String, required: true},
  password:{type:String, required: true},
  bio: { type: String },
  title: { type: String },
  religion: { type: String, enum: ['Islam', 'Christianity', 'Traditionalist', 'Buddhist'] },
  state: { type: String, required: true },
  localGovtArea: { type: String, required: true },
  account: {
    accountName: { type: String },
    accountNumber: { type: String },
    bankName: { type: String },
  },
  history: [
    {
      respondent: String,
      date: Date,
      time: String,
      duration: String,
    }
  ],
  schedule: [
    {
      name: String,
      time: String,
      date: String
    }
  ],
  gallery: [{ type: String }], // URLs of images
  profilePicture: { type: String }, // Profile Picture URL
  reviews: [
    {
      user: String,
      comment: String,
      date: Date,
    }
  ]
});


export default mongoose.model('Minister', ministerSchema);
