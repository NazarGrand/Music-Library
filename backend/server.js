const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./src/config/dbConnection");
const router = require("./src/routes/login-router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
//мідлвар

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("hello!");
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on http://localhost:${PORT}`);
  } else {
    console.error('"Error·occurred,·server·can\'t·start"', error);
  }
});
