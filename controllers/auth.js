import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ERROR_500,
  INVALID_USERNAME_PASS_MSG,
  LOGIN_SUCCESS,
  USER_EXIST,
  USER_REGISTER_MSG,
} from "../utils/constants.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: USER_EXIST });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: USER_REGISTER_MSG });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: INVALID_USERNAME_PASS_MSG });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: INVALID_USERNAME_PASS_MSG });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({ message: LOGIN_SUCCESS, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};
