const mongoose = require("mongoose");

const donationBookOrGameSchema = new mongoose.Schema(
  {
    user: { type: String },
    type: {
      type: String,
      required: [true, "Please specify the type of donation."],
    },

    category: {
      type: String,
      required: [true, "Please specify the category of the item ."],
    },
    name: {
      type: String,
      required: [true, "Please specify the name of the item."],
    },
    age: {
      type: String,
      required: [true, "Please specify the appropriate age."],
    },
    status: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const BookOrGameDonation = mongoose.model(
  "BookOrGameDonation",
  donationBookOrGameSchema
);
module.exports = BookOrGameDonation;
