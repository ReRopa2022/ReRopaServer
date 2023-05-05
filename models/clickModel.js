const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["donation", "entry"],
    },
    date: Date,
  },
  {
    timestamps: true,
    _id: false,
  }
);
const Click = mongoose.model("Click", clickSchema);

module.exports = Click;
