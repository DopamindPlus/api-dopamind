const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const uploadImageToCloudStorage = require("../services/uploadCloudStorageService");

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

const getAllDoctorById = async () => {
  try {
    const result = await prisma.doctor.findMany();
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getDetailDoctorById = async (doctorId) => {
  try {
    const result = await prisma.doctor.findUnique({
      where: {
        doctor_id: doctorId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteDoctorById = async (doctorId) => {
  try {
    const result = await prisma.doctor.delete({
      where: {
        doctor_id: doctorId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createDoctorById = async (data, file) => {
  try {
    if (!file) {
      throw new Error("Image file is required");
    }

    const imageBuffer = file.buffer;

    const imageUrl = await uploadImageToCloudStorage(
      imageBuffer,
      `doctors/${Date.now()}-${data.name}.jpg`
    );

    const result = await prisma.doctor.create({
      data: {
        type_id: data.type_id,
        name: data.name,
        experience: data.experience,
        image: imageUrl,
        price: data.price,
      },
    });

    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateDoctorById = async (doctorId, data) => {
  try {
    const result = await prisma.doctor.update({
      where: {
        doctor_id: doctorId,
      },
      data: {
        type_id: data.type_id,
        name: data.name,
        experience: data.experience,
        image: data.image,
        price: data.price,
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
  getAllDoctorById,
  getDetailDoctorById,
  createDoctorById,
  deleteDoctorById,
  updateDoctorById,
};
