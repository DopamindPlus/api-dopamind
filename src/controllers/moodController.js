const moodService = require("../services/moodService");

const getAllMoodById = async (req, res) => {
  try {
    const { userId } = req.user;

    const mood = await moodService.getAllMoodById(userId);

    return res.status(200).json({
      statusCode: 200,
      message: "Get all mood successfully",
      data: mood,
    });
  } catch (error) {
    console.error("Error getting activities:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDetailMoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const mood = await moodService.getDetailMoodById(Number(id), userId);

    if (!mood) {
      return res.status(404).json({
        statusCode: 404,
        message: "Mood not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get Mood detail successfully",
      data: mood,
    });
  } catch (error) {
    console.error("Error getting Mood detail:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteMoodById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMood = await moodService.deleteMoodById(Number(id));

    if (!deletedMood) {
      return res.status(404).json({
        statusCode: 404,
        message: "Mood not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Mood deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Mood:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllMoodById,
  getDetailMoodById,
  deleteMoodById,
};
