const express = require("express");
const mapsController = require("../controllers/mapsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", mapsController.getNearbyHospitals);
router.post("/directions", mapsController.getDirections);

module.exports = router;
