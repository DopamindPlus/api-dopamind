const express = require("express");
const activityController = require("../controllers/activityController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Middleware untuk autentikasi
router.use(authMiddleware);

// GET: Mendapatkan semua aktivitas user
router.get("/", activityController.getAllActivityById);

// GET: Mendapatkan detail aktivitas berdasarkan ID
router.get("/:id", activityController.getDetailActivityById);

// POST: Membuat aktivitas baru
router.post("/", activityController.createActivityById);

// PUT: Memperbarui aktivitas berdasarkan ID
router.put("/:id", activityController.updateActivityById);

// DELETE: Menghapus aktivitas berdasarkan ID
router.delete("/:id", activityController.deleteActivityById);

module.exports = router;
