const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./src/config/dbConnection");
const router = require("./src/routes/index");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(router);

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
