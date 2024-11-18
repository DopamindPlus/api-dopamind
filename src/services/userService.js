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

const createUser = async (data) => {
  try {
    const result = await prisma.user.create({
      data: {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
        phone: data.phone,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getUserById = async (userId) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteUser = async (userId) => {
  try {
    const result = await prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateUser = async (userId, { data }) => {
  try {
    const result = await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
        phone: data.phone,
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
  createUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
};
