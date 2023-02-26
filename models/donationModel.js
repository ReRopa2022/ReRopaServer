const mongoose = require("mongoose");

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
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
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
      type: String,
      default: "default.jpg",
    },
  },

  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
