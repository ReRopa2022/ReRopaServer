const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { donateItem } = require("../controllers/donationController");

router.post("/", protect, donateItem);

module.exports = router;
