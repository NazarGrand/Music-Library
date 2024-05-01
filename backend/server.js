const express = require("express");
require("dotenv").config();
require("./src/config/dbConnection");

const app = express();
const PORT = 3000;

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
