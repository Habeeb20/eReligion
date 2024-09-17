import mongoose, { Mongoose } from "mongoose";

const appointmentSchema = new mongoose.Schema({
    minister: { type: mongoose.Schema.Types.ObjectId, ref: 'Minister', required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'Pending' } 
})

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment