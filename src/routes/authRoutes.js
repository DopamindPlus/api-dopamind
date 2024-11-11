const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.put("/edit", authMiddleware, authController.updateUser);

module.exports = router;
