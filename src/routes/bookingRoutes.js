const express = require("express");
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", bookingController.getAllBookingById);

router.get("/:id", bookingController.getDetailBookingById);

router.post("/", bookingController.createBookingById);

router.put("/:id", bookingController.updateBookingById);

router.delete("/:id", bookingController.deleteBookingById);

module.exports = router;
