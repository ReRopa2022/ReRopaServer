const express = require("express");

const router = express.Router();

const {
  requestDonation,
  getRequests,
} = require("../controllers/requestController");

router.post("/", requestDonation);
router.get("/", getRequests);

module.exports = router;
