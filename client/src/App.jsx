import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import MinisterLogin from './pages/minister/MinisterLogin';
import MinisterRegister from './pages/minister/MinisterRegister';
// import MinisterProfile from './components/MinisterProfile';
// import VideoCall from './components/VideoCall';
// import ScheduleMeeting from './components/ScheduleMeeting';
// import Payment from './components/Payment';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ministerlogin" element={<MinisterLogin />} />
        <Route path="/ministerregister" element={<MinisterRegister />} />
        {/* <Route path="/minister/:id" element={<MinisterProfile />} />
        <Route path="/videocall" element={<VideoCall />} />
        <Route path="/schedule" element={<ScheduleMeeting />} />
        <Route path="/payment" element={<Payment />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
