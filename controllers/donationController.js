const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const Donation = require("../models/donationModel");

const donateItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const { type, size, age, gender, quantity } = req.body;

  if (!type || !size || !age || !gender || !quantity) {
    res.status(400);
    throw new Error("Please include all fields.");
  }

  const donation = await Donation.create({
    type,
    size,
    age,
    gender,
    quantity,
    user,
  });

  if (donation) {
    res.status(201).json({
      _id: donation._id,
      type: donation.type,
      size: donation.size,
      age: donation.age,
      gender: donation.gender,
      quantity: donation.quantity,
      user: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid donation data.");
  }
});

module.exports = { donateItem };
