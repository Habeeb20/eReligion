import Minister from '../models/ministerModel.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import mongoose from 'mongoose';



export const registerMinister = async (req, res) => {
  try {
    const { firstname, lastname, email, bio,title, password, ministryname, state, localGovtArea, religion, accountName, accountNumber, bankName } = req.body;

    // Check if all required fields are provided
    if (!firstname || !lastname || !email || !password || !ministryname || !bio) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the email is already registered
    const existingMinister = await Minister.findOne({ email });
    if (existingMinister) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new Minister instance
    const newMinister = new Minister({
      firstname,
      lastname,
      email,
      bio,
      title,
      password: hashedPassword, // Save the hashed password
      ministryname,
      state,
      localGovtArea,
      religion,
      account: { accountName, accountNumber, bankName },
      // history: [],
      // schedule: [],
      // gallery: [],
      // reviews: [],
    });

    // Save the new minister to the database
    const savedMinister = await newMinister.save();
    if (!savedMinister) {
      console.log("An error occurred while saving the minister");
    }

    // Respond with the created minister
    res.status(201).json(savedMinister);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Minister.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedMinister = await Minister.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedMinister);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMinisters = async (req, res) => {
  try {
    const ministers = await Minister.find();
    res.status(200).json(ministers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Minister by ID
export const getMinisterById = async (req, res) => {

  try {
    const ministerId = req.user.id;
    const minister = await Minister.findById(ministerId).select('-password');
    if(!minister){
      return res.status(404).json({message: 'user not found'})
    }
    res.status(200).json(minister);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Add Review
export const addReview = async (req, res) => {
  const { id } = req.params;
  const { user, comment } = req.body;
  try {
    const minister = await Minister.findById(id);
    minister.reviews.push({ user, comment, date: new Date() });
    const updatedMinister = await minister.save();
    res.status(200).json(updatedMinister);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  const { id } = req.params;
  const { name, date, time } = req.body;
  try {
    const minister = await Minister.findById(id);
    minister.schedule.push({ name, date, time });
    const updatedMinister = await minister.save();
    res.status(200).json(updatedMinister);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const videoCallHistory = async (req, res) => {
  const { id } = req.params;
  const { respondent, date, time, duration } = req.body;
  try {
    const minister = await Minister.findById(id);
    minister.history.push({ respondent, date, time, duration });
    const updatedMinister = await minister.save();
    res.status(200).json(updatedMinister);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// // Fetch Minister Profile (including reviews and scheduled meetings)
// export const getMinisterProfile = async (req, res) => {
//   try {
//     const { ministerId } = req.params; // Assuming the minister's ID is passed as a URL param

//     if (!mongoose.Types.ObjectId.isValid(ministerId)) {
//       return res.status(400).json({ message: 'Invalid minister ID' });
//     }
  
//     const minister = await Minister.findById(ministerId).populate('reviews.userId').populate('scheduledMeetings.userId');

//     if (!minister) {
//       return res.status(404).json({ message: 'Minister not found' });
//     }

//     return res.status(200).json(minister);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'An error occurred while fetching the profile' });
//   }
// };

// export const getAllMinisters = async (req, res) => {
//   try {
//     const ministers = await Minister.find();  
//     res.status(200).json(ministers);          // Return the ministers array
//   } catch (error) {
//     console.error('Error fetching ministers:', error);  // More detailed log message
//     res.status(500).json({ message: 'An error occurred while fetching ministers' }); // More specific error message
//   }
// };


// export const getASingleMinister = async(req, res) =>{
//   try {
//     const minister = await Minister.findById(req.params.id)
//     if(!minister){
//       res.status(404).json('religious leader not found')
//     }
//     res.json(minister)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message: "server error", error})
//   }
// }



// export const updateProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // If the password is being updated, hash it before saving
//     if (updateData.password) {
//       const salt = await bcrypt.genSalt(10);
//       updateData.password = await bcrypt.hash(updateData.password, salt);
//     }

//     const updatedMinister = await Minister.findByIdAndUpdate(id, updateData, {
//       new: true, // Return the updated document
//       runValidators: true, // Ensure the validation rules are applied during update
//     }).populate('reviews.userId').populate('scheduledMeetings.userId');

//     if (!updatedMinister) {
//       return res.status(404).json({ message: 'Minister not found' });
//     }

//     return res.status(200).json(updatedMinister);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'An error occurred while updating the profile' });
//   }
// };



// Step 1: Send reset password email
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Minister.findOne({ email });
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
};

// Step 2: Handle password reset
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { resetToken } = decoded;

    // Find the user by the token
    const user = await Minister.findOne({ resetToken });
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
};
