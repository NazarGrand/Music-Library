const express = require("express");
const router = express.Router();
const authRoutes = require("./auth-router");
const trackRoutes = require("./track-router");
const albumRoutes = require("./album-router");
const artistRoutes = require("./artist-router");
const authMe = require("../middleware/authMe");

router.use("/auth", authRoutes);

router.use(authMe);

router.use("/tracks", trackRoutes);

router.use("/albums", albumRoutes);

router.use("/artists", artistRoutes);

module.exports = router;
