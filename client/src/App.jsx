import React from 'react'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Profile from './pages/users/Profile'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import { useNavigate, Navigate } from 'react-router-dom'
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

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import './index.css'
import Religion from './pages/Religion'

import MinisterGridDetails from './component/MinisterGridDetails'

//chat

import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import SignUp from "./pages/SignUp"
import ChatLogin from "./pages/Login"
import ChatHome from './pages/ChatHome'
import PopupNotification from './component/choice/PopupNotification'
import Choic1 from './component/choice/Choic1'
import MeetingStep from './pages/Meeting/MeetingStep'
import PolicyPage from './component/choice/PolicyPage'
import PopMinisterReg from './pages/ministers/PopMinisterReg'




const socket = io(import.meta.env.VITE_BACKEND_URL)
const App = () => {

  const { authUser } = useAuthContext()
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('notification', (data) => {
      alert(data.message); // Show notification (simple alert for now)
    });

    socket.on('meeting_notification', (meetingDetails) => {
      alert('you have a new meeting scheduled: ${meetingDetails}')
    })

    return () => {
      socket.off('connect');
      socket.off('notification');
    };
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/religion" element={<Religion />} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ministerlogin" element={<MinisterLogin />} />
        <Route path="/ministerregister" element={<MinisterRegister />} />
        <Route path="/minister/profile" element={<MinisterProfile />} />
        <Route path='/min-forgot-password' element={<MinisterForgotPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/min-reset-password/:token' element={<ResetPassword />} />
        {/* <Route path='/minister/:id' element={<MinisterDetails />} /> */}
        <Route path='/minister/:id/appointment' element={<Appointment />} />
        <Route path='/popupchoice' element={<PopupNotification />} />
        <Route path='/choice' element={<Choic1 />} />
     
        <Route path="/minister/:id" element={<MinisterGridDetails />} />
        <Route path='/meetingstep' element={<MeetingStep />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='popminister' element={<PopMinisterReg />} />
        {/* <Route path='/video' element={<VideoMeetingApp />}/> */}
        <Route path='/video' element={<VideoCall />} />


        //chat
        <Route
          path="/chat"
          element={authUser ? <ChatHome /> : <Navigate to={"/chatlogin"} />}
        />


        <Route
          path="/chatlogin"
          element={authUser ? <Navigate to={"/chat"} /> : <ChatLogin />}
        />

        <Route
          path="/chatsignup"
          element={authUser ? <Navigate to={"/chat"} /> : <SignUp />}
        />


      </Routes>
      <Toaster />
    </BrowserRouter>

  )
}

export default App
