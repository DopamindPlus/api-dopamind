const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/activity", activityRoutes);

app.listen(PORT, () => {
  console.log("Express running in port" + PORT);
});
