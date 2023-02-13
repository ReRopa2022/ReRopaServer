const express = require("express");
const router = express.Router();

const {
  donateItem,
  getDonations,
  upload,
} = require("../controllers/donationController");

router.post("/", upload.single("image"), donateItem);
router.get("/", getDonations);

module.exports = router;
