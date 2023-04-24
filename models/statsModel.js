const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  type: String,
  counter: Number,
});
const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
