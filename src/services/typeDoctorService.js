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

const getAllTypeDoctorById = async () => {
  try {
    const result = await prisma.typeDoctor.findMany();
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getDetailTypeDoctorById = async (typeId) => {
  try {
    const result = await prisma.typeDoctor.findUnique({
      where: {
        type_id: typeId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteTypeDoctorById = async (typeId) => {
  try {
    const result = await prisma.typeDoctor.delete({
      where: {
        type_id: typeId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createTypeDoctorById = async (data) => {
  try {
    const result = await prisma.typeDoctor.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateTypeDoctorById = async (typeId, data) => {
  try {
    const result = await prisma.typeDoctor.update({
      where: {
        booking_id: typeId,
      },
      data: {
        name: data.name,
        description: data.description,
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
  getAllTypeDoctorById,
  getDetailTypeDoctorById,
  createTypeDoctorById,
  updateTypeDoctorById,
  deleteTypeDoctorById,
};
