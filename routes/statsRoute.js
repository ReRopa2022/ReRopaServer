const express = require("express");
const router = express.Router();
const {
  getClothesByQuantityAndDate,
  donateCounter,
} = require("../controllers/statsController");

router.get("/clothes", getClothesByQuantityAndDate);
router.get("/stats-donations", donateCounter);
module.exports = router;
