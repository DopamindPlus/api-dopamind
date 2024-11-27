const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const typeDoctorRoutes = require("./routes/typeDoctorRoutes");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/type-doctor", typeDoctorRoutes);

app.listen(PORT, () => {
  console.log("Express running in port" + PORT);
});
