const asyncHandler = require("express-async-handler");

const Request = require("../models/requestModel");

const requestDonation = asyncHandler(async (req, res) => {
  const {
    organization,
    name,
    phone,
    address,
    seasons,
    sizes,
    sectors,
    genders,
    isUrgent,
  } = req.body;

  if (!sizes || !seasons || !genders) {
    res.status(400).json({ Error: "Please include all fields." });
    return;
  }

  const request = await Request.create({
    organization,
    name,
    phone,
    address,
    seasons,
    genders,
    sectors,
    sizes,
    isUrgent,
  });

  if (request) {
    res.status(201).json({
      _id: request._id,
      organization: request.organization,
      name: request.name,
      phone: request.phone,
      address: request.address,
      seasons: request.seasons,
      genders: request.genders,
      sectors: request.sectors,
      sizes: request.sizes,
      isUrgent: request.isUrgent,
    });
  } else {
    res.status(400);
    throw new Error("Invalid request data.");
  }
});

const getRequests = asyncHandler(async (req, res, next) => {
  Request.find()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

module.exports = { requestDonation, getRequests };
