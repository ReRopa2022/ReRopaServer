const mongoose = require("mongoose");
const Click = require("../models/clickModel");

const statsSchema = new mongoose.Schema({
  donationClicks: [],
  entryClicks: [],
});
const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
