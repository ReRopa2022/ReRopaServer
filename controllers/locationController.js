const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");

const addLocation = asyncHandler(async (req, res) => {
  const { city, street, street_no, info, type } = req.body;

  if (!city || !street || !street_no || !info || !type) {
    res.status(400).json({ Error: "Please include all fields." });
    return;
  }

  let location = await Location.create({
    city,
    street,
    street_no,
    info,
    type,
  });

  if (location) {
    res.status(201).json({
      _id: location._id,
      city: location.city,
      street: location.street,
      street_no: location.street_no,
      info: location.info,
      type: location.type,
    });
  } else {
    res.status(400);
    throw new Error("Invalid location data.");
  }
});

const getLocations = asyncHandler(async (req, res, next) => {
  Location.find()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

module.exports = {
  addLocation,
  getLocations,
};
