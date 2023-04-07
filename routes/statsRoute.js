const express = require("express");
const router = express.Router();
const {
  getClothesByQuantityAndDate,
} = require("../controllers/statsController");

router.get("/clothes", getClothesByQuantityAndDate);

module.exports = router;
