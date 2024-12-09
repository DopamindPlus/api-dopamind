const bookingService = require("../services/bookingService");

const getAllBookingById = async (req, res) => {
  try {
    const { userId } = req.user;

    const booking = await bookingService.getAllBookingById(userId);

    return res.status(200).json({
      statusCode: 200,
      message: "Get all booking successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error getting booking:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDetailBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const booking = await bookingService.getDetailBookingById(
      Number(id),
      userId
    );

    if (!booking) {
      return res.status(404).json({
        statusCode: 404,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get booking detail successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error getting booking detail:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const createBookingById = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookingData = req.body;

    const newBooking = await bookingService.createBookingById(
      userId,
      bookingData
    );

    return res.status(201).json({
      statusCode: 201,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const updateBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingData = req.body;

    const updatedBooking = await bookingService.updateBookingById(
      Number(id),
      bookingData
    );

    if (!updatedBooking) {
      return res.status(404).json({
        statusCode: 404,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await bookingService.deleteBookingById(Number(id));

    if (!deletedBooking) {
      return res.status(404).json({
        statusCode: 404,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllBookingById,
  getDetailBookingById,
  createBookingById,
  updateBookingById,
  deleteBookingById,
};
