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
        id: data.id,
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

const getUserById = async (id) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteUser = async (id) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateUser = async (id, { data }) => {
  try {
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        id: data.id,
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
