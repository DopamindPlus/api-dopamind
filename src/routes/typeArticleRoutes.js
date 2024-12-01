const express = require("express");
const typeArticleController = require("../controllers/typeArticleController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", typeArticleController.getAllTypeArticleById);

router.get("/:id", typeArticleController.getDetailTypeArticleById);

router.post("/", typeArticleController.createTypeArticleById);

router.put("/:id", typeArticleController.updateTypeArticleById);

router.delete("/:id", typeArticleController.deleteTypeArticleById);

module.exports = router;
