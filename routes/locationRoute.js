const express = require("express");

const router = express.Router();

const {
  addLocation,
  getLocations,
  deleteLocation,
  updateLocation,
} = require("../controllers/locationController");

router.post("/", addLocation);
router.get("/", getLocations);
router.put("/", updateLocation);
router.delete("/", deleteLocation);

module.exports = router;
