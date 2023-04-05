const mongoose = require("mongoose");

const excessesSchema = new mongoose.Schema(
  {
    organization: { type: String },
    seasons: {
      type: [],
      required: [true, "Please specify the season."],
    },
    genders: {
      type: String,
      required: [true, "Please enter genders."],
    },
    sizes: {
      type: [],
      required: [true, "Please add sizes."],
    },
    /*sectors: {
      type: [],
    },*/
  },

  {
    timestamps: true,
  }
);

const Excesses = mongoose.model("Excesses", excessesSchema);
module.exports = Excesses;
