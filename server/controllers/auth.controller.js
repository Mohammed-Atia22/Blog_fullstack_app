const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const jwtConfig = require("../jwt.config");
const User = require("../models/user.model");


const generateToken = (payload) =>
  jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });


const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not not match." });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }
    const user = await User.create({ name, email, password });
    const token = generateToken({ id: user._id, email: user.email });
    return res.status(201).json({
      message: "Account created successfully.",
      token,
      user: user.toPublic(),
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const token = generateToken({ id: user._id, email: user.email });
    // localStorage.setItem("token",token);
    return res.status(200).json({
      message: "Logged in successfully.",
      token,
      user: user.toPublic(),
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ user: user.toPublic() });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};



module.exports = { signup, login, getMe };