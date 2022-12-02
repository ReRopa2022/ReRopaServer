const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const Donation = require("../models/donationModel");

const donateItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const { types, seasons, sizes, sectors, genders, quantity, image } = req.body;

  if (!types || !sizes || !seasons || !genders || !quantity) {
    res.status(400);
    throw new Error("Please include all fields.");
  }

  const donation = await Donation.create({
    types,
    seasons,
    genders,
    sectors,
    sizes,
    quantity,
    image,
    user,
  });

  if (donation) {
    res.status(201).json({
      _id: donation._id,
      types: donation.types,
      seasons: donation.seasons,
      genders: donation.genders,
      sectors: donation.sectors,
      sizes: donation.sizes,
      quantity: donation.quantity,
      image: donation.image,
      user: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid donation data.");
  }
});

module.exports = { donateItem };
