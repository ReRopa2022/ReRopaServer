const express = require("express");
const router = express.Router();
const { addToEntryClicksList } = require("../controllers/statsController");
router.get("/", addToEntryClicksList);
module.exports = router;
