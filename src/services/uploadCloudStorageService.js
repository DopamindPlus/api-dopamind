const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../config/keys/service-account-key.json"),
});
const bucketName = "dopamind";

const uploadImageToCloudStorage = async (imageBuffer, fileName) => {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const buffer = Buffer.from(imageBuffer);

    await file.save(buffer, {
      metadata: { contentType: "image/jpeg" },
    });

    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw new Error("Failed to upload image to cloud storage");
  }
};

module.exports = uploadImageToCloudStorage;
