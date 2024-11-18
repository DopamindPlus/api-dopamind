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

const getAllActivityById = async (userId) => {
  try {
    const result = await prisma.activity.findMany({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getDetailActivityById = async (activityId, userId) => {
  try {
    const result = await prisma.activity.findUnique({
      where: {
        activity_id: activityId,
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createActivityById = async (userId, data) => {
  try {
    const result = await prisma.activity.create({
      data: {
        user_id: userId,
        title: data.title,
        location: data.location,
        start_time: new Date(data.start_time),
        end_time: new Date(data.end_time),
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteActivityById = async (activityId) => {
  try {
    const result = await prisma.activity.delete({
      where: {
        id: activityId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateActivityById = async (activityId, data) => {
  try {
    const result = await prisma.activity.update({
      where: {
        activity_id: activityId,
      },
      data: {
        title: data.title,
        location: data.location,
        start_time: new Date(data.start_time),
        end_time: new Date(data.end_time),
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
  getAllActivityById,
  createActivityById,
  updateActivityById,
  deleteActivityById,
  getDetailActivityById,
};
