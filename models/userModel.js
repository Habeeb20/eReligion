
import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: { type: String, unique: true },
  address: String,
  country: String,
  bio: String,
  password: String,
  accountName: String,
  accountNumber: String,
  bankName: String,
  isMinister: Boolean,
  ministerName: String,
  history: [
    {
      name: String,
      date: Date,
      time: String,
      duration: String,
      amountPaid: Number,
    },
  ],
});

export default  mongoose.model('User', userSchema);
