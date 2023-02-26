const express = require("express");
const router = express.Router();

const {
  donateItem,
  getDonations,
  updateStatus,
  upload,
} = require("../controllers/donationController");

router.post("/", upload.single("image"), donateItem);
router.get("/", getDonations);
router.update("/", updateStatus);

module.exports = router;
