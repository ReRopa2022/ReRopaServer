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
  },

  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
