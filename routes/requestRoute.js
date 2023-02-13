const express = require("express");

const router = express.Router();

const { requestDonation } = require("../controllers/requestController");

router.post("/", requestDonation);

module.exports = router;
