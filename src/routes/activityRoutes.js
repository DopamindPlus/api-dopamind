const express = require("express");
const activityController = require("../controllers/activityController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", activityController.getAllActivityById);

router.get("/:id", activityController.getDetailActivityById);

router.post("/", activityController.createActivityById);

router.put("/:id", activityController.updateActivityById);

router.delete("/:id", activityController.deleteActivityById);

module.exports = router;
