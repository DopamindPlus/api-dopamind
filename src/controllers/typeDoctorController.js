const typeDoctorService = require("../services/typeDoctorService");

const getAllTypeDoctorById = async (req, res) => {
  try {
    const typeDoctor = await typeDoctorService.getAllTypeDoctorById();

    return res.status(200).json({
      statusCode: 200,
      message: "Get all type doctor successfully",
      data: typeDoctor,
    });
  } catch (error) {
    console.error("Error getting type doctor:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDetailTypeDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const typeDoctor = await typeDoctorService.getDetailTypeDoctorById(
      Number(id)
    );

    if (!typeDoctor) {
      return res.status(404).json({
        statusCode: 404,
        message: "Type doctor not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get type doctor detail successfully",
      data: typeDoctor,
    });
  } catch (error) {
    console.error("Error getting type doctor detail:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createTypeDoctorById = async (req, res) => {
  try {
    const typeDoctorData = req.body;

    const newTypeDoctor = await typeDoctorService.createTypeDoctorById(
      typeDoctorData
    );

    return res.status(201).json({
      statusCode: 201,
      message: "Type doctor created successfully",
      data: newTypeDoctor,
    });
  } catch (error) {
    console.error("Error creating type doctor:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateTypeDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const typeDoctorData = req.body;

    const updateTypeDoctor = await typeDoctorService.updateTypeDoctorById(
      Number(id),
      typeDoctorData
    );

    if (!updateTypeDoctor) {
      return res.status(404).json({
        statusCode: 404,
        message: "Type Doctor not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Type Doctor updated successfully",
      data: updateTypeDoctor,
    });
  } catch (error) {
    console.error("Error updating Type Doctor:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteTypeDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTypeDoctor = await typeDoctorService.deleteTypeDoctorById(
      Number(id)
    );

    if (!deletedTypeDoctor) {
      return res.status(404).json({
        statusCode: 404,
        message: "Type doctor not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Type doctor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting type doctor:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllTypeDoctorById,
  getDetailTypeDoctorById,
  updateTypeDoctorById,
  deleteTypeDoctorById,
  createTypeDoctorById,
};
