// import express from 'express';
// import { registerUser, loginUser, getUserProfile, updateUserProfile, becomeMinister } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Register new user
// router.post('/register', registerUser);

// // Login user
// router.post('/login', loginUser);

// // Get and update user profile
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// // Become a minister
// router.put('/become-minister', protect, becomeMinister);

// export default router;


import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
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



export default  router;
