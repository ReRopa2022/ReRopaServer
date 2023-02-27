const express = require("express");

const router = express.Router();

const {
  addExcesses,
  getExcesses,
} = require("../controllers/excessesController");

router.post("/", addExcesses);
router.get("/", getExcesses);

module.exports = router;
