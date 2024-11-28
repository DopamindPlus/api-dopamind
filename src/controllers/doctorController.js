const doctorService = require("../services/doctorService");

const getAllDoctorById = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctorById();

    return res.status(200).json({
      statusCode: 200,
      message: "Get all doctors successfully",
      data: doctors,
    });
  } catch (error) {
    console.error("Error getting doctors:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDetailDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await doctorService.getDetailDoctorById(Number(id));

    if (!doctor) {
      return res.status(404).json({
        statusCode: 404,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get doctor detail successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error getting doctor detail:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createDoctorById = async (req, res) => {
  try {
    const doctorData = req.body;

    const image = req.file;

    if (!image) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image is required",
      });
    }

    const newDoctor = await doctorService.createDoctorById(
      doctorData,
      image.buffer
    );

    return res.status(201).json({
      statusCode: 201,
      message: "Doctor created successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.error("Error creating doctor:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorData = req.body;

    const updatedDoctor = await doctorService.updateDoctorById(
      Number(id),
      doctorData
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        statusCode: 404,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await doctorService.deleteDoctorById(Number(id));

    if (!deletedDoctor) {
      return res.status(404).json({
        statusCode: 404,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting doctor:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllDoctorById,
  getDetailDoctorById,
  createDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
