const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");

const addLocation = asyncHandler(async (req, res) => {
  const { city, street, street_no, info, type, lat, long, display } = req.body;

  if (
    !city ||
    !street ||
    !street_no ||
    !info ||
    !type ||
    !lat ||
    !long ||
    !display
  ) {
    res.status(400).json({ Error: "Please include all fields." });
    return;
  }

  let location = await Location.create({
    city,
    street,
    street_no,
    info,
    type,
    lat,
    long,
    display,
  });

  if (location) {
    res.status(201).json({
      _id: location._id,
      city: location.city,
      street: location.street,
      street_no: location.street_no,
      info: location.info,
      type: location.type,
      lat: location.lat,
      long: location.long,
      display: location.display,
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

const updateDisplay = asyncHandler(async (req, res, next) => {
  try {
    const { _id, display } = req.body;
    await Location.findOneAndUpdate(
      { id: _id },
      { $set: { display: display } }
    );
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
});

const deleteLocation = async (req, res, next) => {
  try {
    const { _id } = req.body;

    await Location.findOneAndDelete({ id: _id });
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addLocation,
  getLocations,
  updateDisplay,
  deleteLocation,
};
