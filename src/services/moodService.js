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

const getAllMoodById = async (userId) => {
  try {
    const result = await prisma.mood.findMany({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getDetailMoodById = async (moodId, userId) => {
  try {
    const result = await prisma.mood.findUnique({
      where: {
        mood_id: moodId,
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createMoodById = async (userId, data) => {
  try {
    const result = await prisma.mood.create({
      data: {
        user_id: userId,
        predictions: data.predictions,
        texts: data.texts,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteMoodById = async (moodId) => {
  try {
    const result = await prisma.mood.delete({
      where: {
        mood_id: moodId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

module.exports = {
  disconnectPrisma,
  getAllMoodById,
  getDetailMoodById,
  createMoodById,
  deleteMoodById,
};
