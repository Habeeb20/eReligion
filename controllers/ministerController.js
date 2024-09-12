
import Minister from '../models/ministerModel.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
// Register
export const register = async (req, res) => {
  const { firstName, lastName, email, password, isMinister,ministryName, religion, address, state, LGA } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new Minister({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isMinister,
      ministryName,
      religion,
      state,
      LGA,
      address
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
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

// Fetch Minister Profile (including reviews and scheduled meetings)
export const getMinisterProfile = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the minister's ID is passed as a URL param
    const minister = await Minister.findById(id).populate('reviews.userId').populate('scheduledMeetings.userId');

    if (!minister) {
      return res.status(404).json({ message: 'Minister not found' });
    }

    return res.status(200).json(minister);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the profile' });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If the password is being updated, hash it before saving
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedMinister = await Minister.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the validation rules are applied during update
    }).populate('reviews.userId').populate('scheduledMeetings.userId');

    if (!updatedMinister) {
      return res.status(404).json({ message: 'Minister not found' });
    }

    return res.status(200).json(updatedMinister);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};