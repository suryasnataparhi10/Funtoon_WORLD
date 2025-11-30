const express = require("express");
const router = express.Router();
const profile = require("../Controllers/profileController");
const uploads = require("../Middleware/upload");

router.post("/profile/create",uploads.single("image"), profile.createprofile);
router.get("/profile", profile.getUserProfile)

module.exports = router