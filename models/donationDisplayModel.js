const mongoose = require("mongoose");

const donationDisplaySchema = new mongoose.Schema({
  type: String,
  display: Boolean,
  default: true,
});
const DonationDisplay = mongoose.model(
  "DonationDisplay",
  donationDisplaySchema
);

module.exports = DonationDisplay;
