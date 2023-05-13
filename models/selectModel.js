const mongoose = require("mongoose");
const Options = require("./optionsModel");

const selectSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: ["donation", "location"],
    required: [true, "Please enter the type of the select"],
  },
  options: [Options],
});

const Select = mongoose.model("Stats", selectSchema);

module.exports = Select;
