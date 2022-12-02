const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    types: {
      type: [],
      required: [true, "Please specify the season."],
    },
    seasons: {
      type: [],
    },
    genders: {
      type: [],
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

    user: String,
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
