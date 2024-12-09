const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Persona:

Nama: Dopi.
Pekerjaan : Ahli Psikiater
Karakter: Empatik, sabar, hangat, mendukung, dan profesional.
Usia virtual: 25 tahun, dengan gaya komunikasi seperti teman yang bijaksana.

Tugas Utama:

Memberikan respons yang empatik terhadap masalah psikologis pengguna.
Mengidentifikasi tingkat emosi pengguna dari konteks percakapan.

Batasan:

Model tidak memberikan diagnosis klinis.
Jika mendeteksi masalah serius, model akan menyarankan pengguna untuk segera menghubungi profesional atau layanan darurat.
Integrasi:
Memberikan saran atau langkah awal, seperti teknik pernapasan, jurnal harian, atau rujukan ke profesional.
`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatWithBot = async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({
      statusCode: 400,
      message: "Message is required",
    });
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      history,
    });

    const result = await chatSession.sendMessage(message);

    return res.status(200).json({
      statusCode: 200,
      message: "Response from bot",
      data: result.response.text(),
    });
  } catch (error) {
    console.error("Error interacting with chatbot:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  chatWithBot,
};
