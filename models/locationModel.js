const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, "Please specify the city."],
    },
    street: {
      type: String,
      required: [true, "Please specify the streent."],
    },
    street_no: {
      type: String,
      required: [true, "Please specify the no of the street."],
    },
    info: {
      type: String,
      required: [true, "Please add information about the location."],
    },
    type: {
      type: String,
      required: [true, "Please add type of the location."],
    },
    lat: {
      type: String,
      required: [true, "Please add latitude"],
    },
    long: {
      type: String,
      required: [true, "Please add Longitude"],
    },
    display: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
