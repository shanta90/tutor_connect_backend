import User from '../models/User.js';
import ApiError from '../errors/ApiError.js';
import { generateToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';

export const register = async (userData) => {
  const { name, email, password, role } = userData;
  const userExists = await User.findOne({ email });
  if (userExists) throw new ApiError(400, 'User already exists');

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id);
  
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const token = generateToken(user._id);
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

export const googleLogin = async (userData) => {
  const { email, name } = userData;
  let user = await User.findOne({ email });
  
  if (!user) {
    user = await User.create({
      name,
      email,
      password: Math.random().toString(36).slice(-8) + 'A1a',
      role: 'student'
    });
  }
  
  const token = generateToken(user._id);
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};
