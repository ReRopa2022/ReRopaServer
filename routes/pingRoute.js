const express = require("express");
const router = express.Router();
const {
  addToEntryClicksList,
  addToDonateClicksList,
} = require("../controllers/statsController");

router.get("/", addToEntryClicksList);

router.get("/with-user", (req, res) => {
  return res.status(200).json({ message: "Server is live" });
});

router.get("/donations", addToDonateClicksList);

module.exports = router;
