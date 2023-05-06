const express = require("express");
const router = express.Router();
const {
  getClothesByQuantityAndDate,
  getAllStats,
  getDonationClicksList,
  getEntryClicksList,
} = require("../controllers/statsController");

router.get("/clothes", getClothesByQuantityAndDate);

router.get("/stats-donations", getDonationClicksList);

router.get("/stats-entries", getEntryClicksList);

router.get("/", getAllStats);

module.exports = router;
