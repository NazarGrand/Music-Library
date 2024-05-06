const express = require("express");
const router = express.Router();
const loginRoutes = require("./login-router");

router.use("/api", loginRoutes);

module.exports = router;
