const mongoose = require("mongoose");
const Image = require("./imageModel").schema;
const donationSchema = new mongoose.Schema(
  {
    types: {
      type: String,
      required: [true, "Please specify the season."],
    },
    seasons: {
      type: [],
    },
    genders: {
      type: String,
      required: [true, "Please enter genders."],
    },
    sizes: {
      type: [],
      required: [true, "Please add sizes."],
    },
    sectors: {
      type: [],
    },
    condition: {
      type: String,
      required: [true, "Please enter the condition."],
    },
    status: {
      type: String,
    },
    user: { type: String },
    image: {
      type: Image,
    },
  },

  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
