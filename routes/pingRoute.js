const express = require("express");
const router = express.Router();
const { entriesCounter } = require("../controllers/statsController");
router.get("/", entriesCounter);
module.exports = router;
