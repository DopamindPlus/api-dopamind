const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const typeDoctorRoutes = require("./routes/typeDoctorRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const articleRoutes = require("./routes/articleRoutes");
const typeArticleRoutes = require("./routes/typeArticleRoutes");
const moodRoutes = require("./routes/moodRoutes");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/type-doctor", typeDoctorRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/type-article", typeArticleRoutes);
app.use("/api/mood", moodRoutes);

app.listen(PORT, () => {
  console.log("Express running in port" + PORT);
});
