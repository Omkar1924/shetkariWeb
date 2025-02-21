const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const sevas = require("../../database/models");
const { User, Menu, Order } = require("../../database/models");

const { Sequelize } = require("sequelize");

router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { userName, email, mobail, password, address } = req.body;

    // Add validation logic if needed

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    await User.create({
      userName,
      email,
      mobail,
      password: hashedPassword,
      address,
    });

    // Send response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Retrieve user from database based on email
//     const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     const user = rows[0];

//     // Check if user exists and password is correct
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

//     res.json({ token });
//   } catch (error) {
//     console.error('Login failed:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email: email } });

    // If user doesn't exist or password is incorrect, send error response
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    console.log(user.dataValues);

    // let userData = "";
    let userData = user.dataValues;
    delete userData.password;

    // Send response with token
    res.json({ token: token, userData: userData });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/loginn", async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     // Find user by username
//     const user = await User.findOne({ userName });

//     // If user doesn't exist or password is incorrect, send error response
//     if (!user || !(await bcrypt.compare(password, user.password, userName))) {
//       console.log("error");
//       return res.status(401).json({ message: "Invalid username or password" });
//     } else {
//       console.log("success");
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, "your_secret_key", {
//       expiresIn: "1h",
//     });

//     // Send response with token
//     res.json({ token });
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.get("/getmenu", async (req, res) => {
  try {
    const menu = await Menu.findAll();
    console.log(menu);
    res.status(200).json({ menu });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/addMenuItems", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    // Create menu in the database
    await Menu.create({
      name,
      price,
      image,
    });

    // Send response
    res.status(201).json({ message: "Items added successfully" });
  } catch (error) {
    console.error("Error adding items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/orders", async (req, res) => {
//   try {
//     const { userId, items, totalAmount } = req.body;

//     // Create the order
//     const order = await Order.create({
//       userId,
//       items,
//       totalAmount,
//       status: "Placed", // Default status
//     });

//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = router;
