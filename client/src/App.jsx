import React from 'react'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Profile from './pages/users/Profile'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import ForgotPassword from './pages/users/ForgotPassword'
import ResetPassword from './pages/users/ResetPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MinisterLogin from './pages/ministers/MinisterLogin'
import MinisterRegister from './pages/ministers/MinisterRegister'
import MinisterResetPassword from './pages/ministers/MinisterResetPassword'
import MinisterForgotPassword from './pages/ministers/MinisterForgotPassword'
import MinisterProfile from './pages/ministers/MinisterProfile'
import Appointment from './pages/ministers/Appointment'
import MinisterDetails from './pages/ministers/MinisterDetails'
import VideoCall from './pages/VideoCall/VideoCall'
import VideoCallHistory from './pages/VideoCall/VideoCallHistory'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import './index.css'
import Religion from './pages/Religion'

const socket = io(import.meta.env.VITE_BACKEND_URL)
const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('notification', (data) => {
      alert(data.message); // Show notification (simple alert for now)
    });

    return () => {
      socket.off('connect');
      socket.off('notification');
    };
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/religion" element={<Religion />} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ministerlogin" element={<MinisterLogin />} />
        <Route path="/ministerregister" element={<MinisterRegister />} />
        <Route path="/minister/:id" element={<MinisterProfile />} />
        <Route path='/min-forgot-password' element={<MinisterForgotPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/min-reset-password/:token' element={<ResetPassword />} />
        <Route path='/minister/:id' element={<MinisterDetails />} />
        <Route path='/minister/:id/appointment' element={<Appointment />} />

      </Routes>
    </BrowserRouter>
  
  )
}

export default App
