const express = require("express");
const router = express.Router();

const {
  donateItem,
  getDonations,
  updateStatus,
  upload,
  deleteDonation,
  donateBookOrGame,
  getBookOrGames,
} = require("../controllers/donationController");

router.post("/", upload.single("image"), donateItem);
router
  .post("/book-or-game", donateBookOrGame)
  .get("/book-or-games", getBookOrGames);
router.get("/", getDonations);
router.patch("/", updateStatus);
router.delete("/", deleteDonation);

module.exports = router;
