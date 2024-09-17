import Appointment from "../models/appointmentSchema.js"
import Minister from "../models/ministerModel.js"

import { Socket } from "socket.io";
export const bookAppointment = async(req, res) => {
    const {id} = req.params;
    const {name, date, time} = req.body;


  try {
    const minister = await Minister.findById(id);
    if (!minister) {
      return res.status(404).json({ error: 'Minister not found' });
    }

    const appointment = new Appointment({
      minister: id,
      name,
      date,
      time
    });

    await appointment.save();
    req.io.emit('notification', { ministerId: id, message: `New appointment request from ${name}`, details: appointment });
    res.status(200).json(appointment);
} catch(error){
    console.log(error)
    res.status(400).json({ error: error.message });
}}


export const getAppointments = async (req, res) => {
    const { id } = req.params;  // Minister ID from URL
  
    try {
      const appointments = await Appointment.find({ minister: id });
      res.status(200).json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
;

export const updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body; // status could be 'approved', 'rejected', etc.
    
    try {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      // Update the appointment status (approve/reject)
      appointment.status = status;
      const updatedAppointment = await appointment.save();
  
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
