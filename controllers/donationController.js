const asyncHandler = require("express-async-handler");
const multer = require("multer");
const Donation = require("../models/donationModel");
const Image = require("../models/imageModel");
const BookOrGameDonation = require("../models/donationBookOrGameModel");
const fs = require("fs");
const path = require("path");
const Request = require("../models/requestModel");
const { set } = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, "reropaDonation" + "-" + Date.now().toString());
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/JPG"
  ) {
    cb(null, true);
    console.log("Donation uploaded successfully.");
  } else {
    cb(null, false);
    console.log("Donation denied.");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576,
  },
  fileFilter: fileFilter,
});

const donateItem = asyncHandler(async (req, res) => {
  const { types, seasons, sizes, sectors, genders, condition, image, user } =
    req.body;

  if (!types || !sizes || !seasons || !genders || !condition) {
    res.status(400).json({ Error: "Please include all fields." });
    return;
  }

  let donation;

  const request = await Request.find({
    seasons: { $in: seasons },
    genders: { $in: genders },
    sizes: { $in: sizes },
    sectors: { $in: sectors },
  });

  if (request[0]) {
    if (!req.file) {
      donation = await Donation.create({
        types,
        seasons,
        genders,
        sectors,
        sizes,
        image,
        user,
        condition,
      });
    } else {
      const image = new Image({
        name: req.file.filename,
        img: {
          data: fs.readFileSync(
            path.join(__dirname, "../public/img/uploads/", req.file.filename)
          ),
          contentType: req.file.mimetype,
        },
      }).save();
      donation = await Donation.create({
        types,
        seasons,
        genders,
        sectors,
        sizes,
        image,
        user,
        condition,
      });
    }
  } else {
    res.status(200).json({
      isRequired: false,
    });
    console.log(donation);
    return;
  }

  if (donation) {
    res.status(201).json({
      _id: donation._id,
      types: donation.types,
      seasons: donation.seasons,
      genders: donation.genders,
      sectors: donation.sectors,
      sizes: donation.sizes,
      image: donation.image,
      condition: donation.condition,
      user: user,
      isRequired: true,
    });
    console.log(donation);
  } else {
    console.log(donation);
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
    const { donation_id, status } = req.body;
    await Donation.findOneAndUpdate(
      { id: donation_id },
      { $set: { status: status } }
    );
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteBooKOrGameDonation = async (req, res, next) => {
  try {
    const { bookorgame_id } = req.body;

    await BookOrGameDonation.findOneAndDelete({ id: bookorgame_id });
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
};

const updateBookGameStatus = async (req, res, next) => {
  try {
    const { bookorgame_id, status } = req.body;
    await BookOrGameDonation.findOneAndUpdate(
      { id: bookorgame_id },
      { $set: { status: status } }
    );
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteDonation = async (req, res, next) => {
  try {
    const { donation_id } = req.body;

    await Donation.findOneAndDelete({ id: donation_id });
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
};

const donateBookOrGame = async (req, res, next) => {
  try {
    const { user, type, category, name, age } = req.body;
    //Fields validation
    if (!type || !category || !name || !age) {
      res.status(400).json({ Error: "Please include all fields." });
      return;
    }
    const bookOrGame = await BookOrGameDonation.create({
      user,
      type,
      category,
      name,
      age,
    });
    await bookOrGame.save();
    res.status(200).json({
      status: "Success",
      isRequired: true,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const getBookOrGames = asyncHandler(async (req, res, next) => {
  BookOrGameDonation.find()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

const getImage = asyncHandler(async (req, res, next) => {
  const { imageId } = req.body;
  Image.findOne({ id: imageId })
    .then((data) => res.send(data))
    .catch((error) => res.json(error));
});

module.exports = {
  donateItem,
  getDonations,
  upload,
  updateStatus,
  deleteDonation,
  donateBookOrGame,
  getBookOrGames,
  deleteBooKOrGameDonation,
  updateBookGameStatus,
  getImage,
};
