const express = require("express");
const chatbotController = require("../controllers/chatbotController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", chatbotController.chatWithBot);

module.exports = router;
