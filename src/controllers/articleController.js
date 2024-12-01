const articleService = require("../services/articleService");

const getAllArticleById = async (req, res) => {
  try {
    const articles = await articleService.getAllArticleById();

    return res.status(200).json({
      statusCode: 200,
      message: "Get all articles successfully",
      data: articles,
    });
  } catch (error) {
    console.error("Error getting articles:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDetailArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await articleService.getDetailArticleById(Number(id));

    if (!article) {
      return res.status(404).json({
        statusCode: 404,
        message: "Article not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get article detail successfully",
      data: article,
    });
  } catch (error) {
    console.error("Error getting article detail:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createArticleById = async (req, res) => {
  try {
    const articleData = req.body;

    const image = req.file;

    if (!image) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image is required",
      });
    }

    const newArticle = await articleService.createArticleById(
      articleData,
      image.buffer
    );

    return res.status(201).json({
      statusCode: 201,
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    console.error("Error creating article:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const articleData = req.body;

    const updatedArticle = await articleService.updateArticleById(
      Number(id),
      articleData
    );

    if (!updatedArticle) {
      return res.status(404).json({
        statusCode: 404,
        message: "Article not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Article updated successfully",
      data: updatedArticle,
    });
  } catch (error) {
    console.error("Error updating article:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArticle = await articleService.deleteArticleById(Number(id));

    if (!deletedArticle) {
      return res.status(404).json({
        statusCode: 404,
        message: "Article not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllArticleById,
  getDetailArticleById,
  updateArticleById,
  deleteArticleById,
  createArticleById,
};
