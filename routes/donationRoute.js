const express = require("express");
const router = express.Router();

const {
  donateItem,
  getDonations,
  updateStatus,
  upload,
  deleteDonation,
} = require("../controllers/donationController");

router.post("/", upload.single("image"), donateItem);
router.get("/", getDonations);
router.patch("/", updateStatus);
router.delete("/", deleteDonation);

module.exports = router;
