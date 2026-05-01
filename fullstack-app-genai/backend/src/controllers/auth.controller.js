import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../dao/user.dao.js';
import config from '../config/config.js';

// Google Sign-In / Register handler
export const googleAuth = async (req, res) => {
  try {
    const { fullname, email } = req.body;

    if (!email || !fullname) {
      return res.status(400).json({ message: 'fullname and email are required' });
    }

    // Check if user already exists, else create new
    let user = await findUserByEmail(email);
    if (!user) {
      user = await createUser({ fullname, email });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({ token, user });
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get current logged-in user
export const getMe = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
