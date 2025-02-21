const express = require("express");
const router = express.Router();
const Users = require("../../database/models").user;
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Validation schemas
const usernameSchema = Joi.string().min(4).required();
const passwordSchema = Joi.string()
  .min(8)
  .pattern(new RegExp("^(?=.*[A-Z])"))
  .message({
    "string.min": "Password must have at least 8 characters",
    "string.pattern.base": "Password must contain at least one capital letter",
  })
  .pattern(new RegExp("^(?=.*[0-9])"))
  .message({
    "string.pattern.base": "Password must contain at least one number",
  })
  .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
  .message({
    "string.pattern.base":
      "Password must contain at least one special character",
  })
  .required();

const confirmPasswordSchema = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Passwords don't match",
  });

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token and user data
    res.status(200).json({ token, userData: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validate input
    const { error } = Joi.object({
      username: usernameSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema,
    }).validate({ username, password, confirmPassword });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Users.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;