const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    organization: { type: String },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
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
    isUrgent: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
