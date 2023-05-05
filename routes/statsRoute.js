const express = require("express");
const router = express.Router();
const {
  getClothesByQuantityAndDate,
  addToDonateClicksList,
  addToEntryClicksList,
  getDonateClicksList,
  getEntryClicksList,
} = require("../controllers/statsController");

router.get("/clothes", getClothesByQuantityAndDate);
router.get("/stats-donations", getDonateClicksList);
router.get("/stats-entries", getEntryClicksList);
module.exports = router;
