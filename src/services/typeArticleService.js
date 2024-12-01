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

const getAllArticleTypeById = async () => {
  try {
    const result = await prisma.typeArticle.findMany();
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getDetailArticleTypeById = async (articleTypeId) => {
  try {
    const result = await prisma.typeArticle.findUnique({
      where: {
        type_article_id: articleTypeId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteArticleTypeById = async (articleTypeId) => {
  try {
    const result = await prisma.typeArticle.delete({
      where: {
        type_article_id: articleTypeId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createArticleTypeById = async (data) => {
  try {
    const result = await prisma.typeArticle.create({
      data: {
        name: data.name,
      },
    });

    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateArticleTypeById = async (articleTypeId, data) => {
  try {
    const result = await prisma.typeArticle.update({
      where: {
        article_id: articleTypeId,
      },
      data: {
        name: data.name,
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
  createArticleTypeById,
  getAllArticleTypeById,
  getDetailArticleTypeById,
  updateArticleTypeById,
  deleteArticleTypeById,
};
