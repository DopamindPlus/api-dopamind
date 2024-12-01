const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log("Express running in port" + PORT);
});
