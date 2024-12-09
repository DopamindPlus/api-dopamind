const express = require("express");
const doctorController = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", doctorController.getAllDoctorById);

router.get("/:id", doctorController.getDetailDoctorById);

router.post("/", upload.single("image"), doctorController.createDoctorById);

router.put("/:id", doctorController.updateDoctorById);

router.delete("/:id", doctorController.deleteDoctorById);

module.exports = router;
