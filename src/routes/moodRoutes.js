const express = require("express");
const moodController = require("../controllers/moodController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", moodController.getAllMoodById);

router.get("/:id", moodController.getDetailMoodById);

router.post("/", moodController.createMoodById);

router.delete("/:id", moodController.deleteMoodById);

module.exports = router;
