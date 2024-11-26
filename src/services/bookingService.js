const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const handlePrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("Prisma Client Known Request Error:", error.message);
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    s;
    console.error("Prisma Client Unknown Request Error:", error.message);
  } else {
    console.error("Unexpected Error:", error);
  }
  throw new Error("Internal Server Error");
};

// Disconnect Prisma client when done
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

const getAllBookingById = async (userId) => {
  try {
    const result = await prisma.booking.findMany({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getDetailBookingById = async (bookingId, userId) => {
  try {
    const result = await prisma.booking.findUnique({
      where: {
        booking_id: bookingId,
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteBookingById = async (bookingId) => {
  try {
    const result = await prisma.booking.delete({
      where: {
        booking_id: bookingId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createBookingById = async (userId, data) => {
  try {
    const result = await prisma.booking.create({
      data: {
        user_id: userId,
        doctor_id: data.doctor_id,
        notes: data.notes,
        date: new Date(data.date),
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateBookingById = async (bookingId, data) => {
  try {
    const result = await prisma.booking.update({
      where: {
        booking_id: bookingId,
      },
      data: {
        user_id: userId,
        doctor_id: data.doctor_id,
        notes: data.notes,
        date: new Date(data.date),
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

module.exports = {
  handlePrismaError,
  disconnectPrisma,
  getAllBookingById,
  getDetailBookingById,
  deleteBookingById,
  createBookingById,
  updateBookingById,
};
