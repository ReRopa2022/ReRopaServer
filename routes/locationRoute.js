const express = require("express");

const router = express.Router();

const {
  addLocation,
  getLocations,
  deleteLocation,
  updateLocation,
  getDisplayLocations,
} = require("../controllers/locationController");

router.post("/", addLocation);
router.get("/", getLocations);
router.get("/users", getDisplayLocations);
router.put("/", updateLocation);
router.delete("/", deleteLocation);

module.exports = router;
