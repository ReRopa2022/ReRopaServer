const asyncHandler = require("express-async-handler");
const multer = require("multer");
const Donation = require("../models/donationModel");
const path = require("path");
const { set } = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
    console.log("Donation uploaded successfully.");
  } else {
    cb(null, false);
    console.log("Donation denied.");
  }
};

const upload = multer({
  storage: storage,
  //limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const donateItem = asyncHandler(async (req, res) => {
  const {
    types,
    seasons,
    sizes,
    sectors,
    genders,
    quantity,
    condition,
    image,
    user,
  } = req.body;

  if (!types || !sizes || !seasons || !genders || !quantity || !condition) {
    res.status(400).json({ Error: "Please include all fields." });
  }
  let donation;

  if (!req.file) {
    donation = await Donation.create({
      types,
      seasons,
      genders,
      sectors,
      sizes,
      quantity,
      image,
      user,
      condition,
    });
  } else {
    donation = await Donation.create({
      types,
      seasons,
      genders,
      sectors,
      sizes,
      quantity,
      image: req.file.filename,
      user,
      condition,
    });
  }

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
      condition: donation.condition,
      user: user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid donation data.");
  }
});

const getDonations = asyncHandler(async (req, res, next) => {
  Donation.find()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

const updateStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    await Donation.findOneAndUpdate({ id: id }, { $set: { status: status } });
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { donateItem, getDonations, upload, updateStatus };
