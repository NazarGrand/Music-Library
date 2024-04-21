const express = require("express");

const app = express();
const PORT = 3001;

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
