const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please specify the season."],
    },
    size: {
      type: String,
      required: [true, "Please add a size."],
    },
    age: {
      type: String,
      required: [true, "Please add age."],
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter a gender."],
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
    },

    user: String,
  },

  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
