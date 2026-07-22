import * as authService from '../services/authService.js';

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await authService.registerUser(email, password);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error.message === 'Email is already registered') error.status = 409;
    next(error); 
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const data = await authService.loginUser(email, password);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error.message === 'Invalid credentials') error.status = 401;
    next(error);
  }
};