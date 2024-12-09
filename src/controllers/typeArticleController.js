const typeArticleService = require("../services/typeArticleService");

const getAllTypeArticleById = async (req, res) => {
  try {
    const typeArticle = await typeArticleService.getAllArticleTypeById();

    return res.status(200).json({
      statusCode: 200,
      message: "Get all type article successfully",
      data: typeArticle,
    });
  } catch (error) {
    console.error("Error getting type article:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDetailTypeArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const typeArticle = await typeArticleService.getDetailArticleTypeById(
      Number(id)
    );

    if (!typeArticle) {
      return res.status(404).json({
        statusCode: 404,
        message: "Type article not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get type article detail successfully",
      data: typeArticle,
    });
  } catch (error) {
    console.error("Error getting type article detail:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createTypeArticleById = async (req, res) => {
  try {
    const typeArticleData = req.body;

    const newTypeArticle = await typeArticleService.createArticleTypeById(
      typeArticleData
    );

    return res.status(201).json({
      statusCode: 201,
      message: "Type article created successfully",
      data: newTypeArticle,
    });
  } catch (error) {
    console.error("Error creating type article:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateTypeArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const typeArticleData = req.body;

    const updateTypeArticle = await typeArticleService.updateArticleTypeById(
      Number(id),
      typeArticleData
    );

    if (!updateTypeArticle) {
      return res.status(404).json({
        statusCode: 404,
        message: "Type article not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Type article updated successfully",
      data: updateTypeArticle,
    });
  } catch (error) {
    console.error("Error updating type article:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteTypeArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTypeArticle = await typeArticleService.deleteArticleTypeById(
      Number(id)
    );

    if (!deletedTypeArticle) {
      return res.status(404).json({
        statusCode: 404,
        message: "Type article not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Type article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting type article:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllTypeArticleById,
  getDetailTypeArticleById,
  createTypeArticleById,
  updateTypeArticleById,
  deleteTypeArticleById,
};
