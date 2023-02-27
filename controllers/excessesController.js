const asyncHandler = require("express-async-handler");

const Excesses = require("../models/excessesModel");

const addExcesses = asyncHandler(async (req, res) => {
  const {
    organization,
    name,
    phone,
    address,
    seasons,
    sizes,
    sectors,
    genders,
    quantity,
  } = req.body;

  if (!sizes || !seasons || !genders || !quantity) {
    res.status(400).json({ Error: "Please include all fields." });
  }

  const excesses = await Excesses.create({
    organization,
    name,
    phone,
    address,
    seasons,
    genders,
    sectors,
    sizes,
    quantity,
  });

  if (excesses) {
    res.status(201).json({
      _id: excesses._id,
      organization: excesses.organization,
      name: excesses.name,
      phone: excesses.phone,
      address: excesses.address,
      seasons: excesses.seasons,
      genders: excesses.genders,
      sectors: excesses.sectors,
      sizes: excesses.sizes,
      quantity: excesses.quantity,
    });
  } else {
    res.status(400);
    throw new Error("Invalid excesses data.");
  }
});

const getExcesses = asyncHandler(async (req, res, next) => {
  Excesses.find()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

module.exports = { getExcesses, addExcesses };
