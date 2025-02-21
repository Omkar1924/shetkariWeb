const express = require("express");
const router = express.Router();
require("dotenv").config();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const orderRoutes = require("./orderRoutes");


router.use('/',userRoutes)
router.use('/',authRoutes)
router.use('/',orderRoutes)


module.exports = router;

















