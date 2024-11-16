import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const signOut = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out"
  });
};



const requireSignin = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Bypass authorization in development mode
    return next();
  }

  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth',
  })(req, res, next);
};


const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status('403').json({
      error: "User is not authorized"
    });
  }
  next();
};



export default {signIn, signOut, requireSignin, hasAuthorization};
