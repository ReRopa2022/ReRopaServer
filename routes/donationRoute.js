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
  deleteBooKOrGameDonation,
  updateBookGameStatus,
  getImage,
} = require("../controllers/donationController");

router
  .post("/", upload.single("image"), donateItem)
  .get("/", getDonations)
  .patch("/", updateStatus)
  .delete("/", deleteDonation);
router
  .post("/book-or-game", donateBookOrGame)
  .get("/book-or-game", getBookOrGames)
  .delete("/book-or-game", deleteBooKOrGameDonation)
  .patch("/book-or-game", updateBookGameStatus);

router.post("/image", getImage);

module.exports = router;
