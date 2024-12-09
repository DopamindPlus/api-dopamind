const express = require("express");
const typeDoctorController = require("../controllers/typeDoctorController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", typeDoctorController.getAllTypeDoctorById);

router.get("/:id", typeDoctorController.getDetailTypeDoctorById);

router.post("/", typeDoctorController.createTypeDoctorById);

router.put("/:id", typeDoctorController.updateTypeDoctorById);

router.delete("/:id", typeDoctorController.deleteTypeDoctorById);

module.exports = router;
