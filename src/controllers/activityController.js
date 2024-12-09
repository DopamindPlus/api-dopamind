const activityService = require("../services/activityService");

const getAllActivityById = async (req, res) => {
  try {
    const { userId } = req.user;

    const activities = await activityService.getAllActivityById(userId);

    return res.status(200).json({
      statusCode: 200,
      message: "Get all activities successfully",
      data: activities,
    });
  } catch (error) {
    console.error("Error getting activities:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDetailActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const activity = await activityService.getDetailActivityById(
      Number(id),
      userId
    );

    if (!activity) {
      return res.status(404).json({
        statusCode: 404,
        message: "Activity not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get activity detail successfully",
      data: activity,
    });
  } catch (error) {
    console.error("Error getting activity detail:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createActivityById = async (req, res) => {
  try {
    const { userId } = req.user;
    const activityData = req.body;

    const newActivity = await activityService.createActivityById(
      userId,
      activityData
    );

    return res.status(201).json({
      statusCode: 201,
      message: "Activity created successfully",
      data: newActivity,
    });
  } catch (error) {
    console.error("Error creating activity:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activityData = req.body;

    const updatedActivity = await activityService.updateActivityById(
      Number(id),
      activityData
    );

    if (!updatedActivity) {
      return res.status(404).json({
        statusCode: 404,
        message: "Activity not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Activity updated successfully",
      data: updatedActivity,
    });
  } catch (error) {
    console.error("Error updating activity:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedActivity = await activityService.deleteActivityById(
      Number(id)
    );

    if (!deletedActivity) {
      return res.status(404).json({
        statusCode: 404,
        message: "Activity not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Activity deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting activity:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllActivityById,
  getDetailActivityById,
  createActivityById,
  updateActivityById,
  deleteActivityById,
};
