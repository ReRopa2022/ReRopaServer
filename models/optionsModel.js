const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    name: String,
    id: Number,
  },
  {
    timestamps: true,
    _id: false,
  }
);
const Options = mongoose.model("Option", optionSchema);

module.exports = Options;
