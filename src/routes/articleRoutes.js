const express = require("express");
const articleController = require("../controllers/articleController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", articleController.getAllArticleById);

router.get("/:id", articleController.getDetailArticleById);

router.post("/", upload.single("image"), articleController.createArticleById);

router.put("/:id", articleController.updateArticleById);

router.delete("/:id", articleController.deleteArticleById);

module.exports = router;
