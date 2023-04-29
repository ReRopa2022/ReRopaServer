const express = require("express");

const router = express.Router();

const {
  addLocation,
  getLocations,
  updateDisplay,
  deleteLocation,
} = require("../controllers/locationController");

router.post("/", addLocation);
router.get("/", getLocations);
router.patch("/", updateDisplay);
router.delete("/", deleteLocation);

module.exports = router;
