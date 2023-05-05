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
router
  .get("/stats-donations", getDonateClicksList)
  .post("/stats-donations", addToDonateClicksList);
router
  .get("/stats-entries", getEntryClicksList)
  .post("/stats-entries", addToEntryClicksList);
module.exports = router;
