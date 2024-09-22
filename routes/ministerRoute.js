import express from "express"
import { registerMinister, addReview, getMinisterById, updateProfile, forgotPassword, resetPassword, bookAppointment, videoCallHistory, getMinisters, login, getleaderscounts } from "../controllers/ministerController.js";
import { verifyToken } from "./userRoute.js";

const router = express.Router();


router.post('/register', registerMinister);
router.post('/login', login)
router.put('/profile/:id', updateProfile);
router.get('/ministers', getMinisters);
router.get('/profile', verifyToken, getMinisterById)
router.get('/minister/:id', verifyToken, getMinisterById);
router.post('/minister/:id/review', addReview);
router.get('/ministercount', getleaderscounts );

// Appointments
router.post('/minister/:id/appointment', bookAppointment);

// Video Call History
router.post('/minister/:id/video-call-history', videoCallHistory);

// router.get('/singleminister/:id', getASingleMinister)
// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password/:token', resetPassword);

export default router





