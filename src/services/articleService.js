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

const getAllArticleById = async () => {
  try {
    const result = await prisma.article.findMany();
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getDetailArticleById = async (articleId) => {
  try {
    const result = await prisma.article.findUnique({
      where: {
        article_id: articleId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteArticleById = async (articleId) => {
  try {
    const result = await prisma.article.delete({
      where: {
        article_id: articleId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createArticleById = async (data, file) => {
  try {
    if (!file) {
      throw new Error("Image file is required");
    }

    const typeArticleId = Number(data.type_article_id);

    if (isNaN(typeArticleId)) {
      throw new Error("Invalid type_article_id");
    }

    const imageBuffer = file.buffer;

    const imageUrl = await uploadImageToCloudStorage(
      imageBuffer,
      `articles/${Date.now()}-${data.title}.jpg`
    );

    const result = await prisma.article.create({
      data: {
        type_article_id: typeArticleId,
        title: data.title,
        image: imageUrl,
        content: data.content,
      },
    });

    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateArticleById = async (articleId, data) => {
  try {
    const result = await prisma.article.update({
      where: {
        article_id: articleId,
      },
      data: {
        type_article_id: data.type_article_id,
        title: data.title,
        image: imageUrl,
        content: data.conte,
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
  getAllArticleById,
  getDetailArticleById,
  deleteArticleById,
  createArticleById,
  updateArticleById,
};
