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
        password: data.password,
        username: data.username,
        name: data.name,
        phone: data.phone,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};
