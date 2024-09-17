import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import nodemailer from "nodemailer"
import crypto from 'crypto';
import Appointment from "../models/appointmentSchema.js"
const router = express.Router();
// Register User
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, address, country, bio, password, accountName, accountNumber, bankName, ministerName, history } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      address,
      country,
      bio,
      password: hashedPassword,
      accountName,
      accountNumber,
      bankName,
      history,
      isMinister: false,
      ministerName,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
});
// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Function to get the profile of the logged-in user
router.get('/profile', verifyToken, async (req, res) => {
  try {
 
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to update the profile of the logged-in user
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// //get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();  
    res.status(200).json(users);  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred' }); 
  }
});

router.get('/appointments/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Use `find` to get all appointments for a specific user
    const appointments = await Appointment.find({ user: userId });
    
    // Check if there are appointments found for the user
    if (!appointments || appointments.length === 0) {
      console.log("the error is here")
      return res.status(404).json({ error: 'No appointments found for this user' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
});




// Step 1: Send reset password email
router.post('/forgot-password',  async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = jwt.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send an email with the reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password: \n\n ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Step 2: Handle password reset
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { resetToken } = decoded;

    // Find the user by the token
    const user = await User.findOne({ resetToken });
    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});




export default  router;
