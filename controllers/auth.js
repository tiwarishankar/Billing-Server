import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  // try {
  //   const user = await User.findOne({ username: req.body.username });
  //   if (!user) return res.status(404).send("User not found");

  //   const isPasswordCorrect = await bcrypt.compare(
  //     req.body.password,
  //     user.password
  //   );
  //   if (!isPasswordCorrect)
  //     return res.status(400).send("Wrong password or username!");
  //   // return next(createError(400, "Wrong password or username!"));

  //   const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "JWT");

  //   const { password, isAdmin, ...otherDetails } = user._doc;
  //   res
  //     .cookie("access_token", token, {
  //       httpOnly: true,
  //     })
  //     .status(200)
  //     .json({ details: { ...otherDetails }, isAdmin });
  // } catch (err) {
  //   res.status(403).send("data not found");
  // }
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "secretkey");
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
