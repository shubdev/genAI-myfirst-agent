import User from '../models/user.model.js';

// Find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Create a new user
export const createUser = async ({ fullname, email }) => {
  const user = new User({ fullname, email });
  return await user.save();
};

// Find user by ID
export const findUserById = async (id) => {
  return await User.findById(id);
};
