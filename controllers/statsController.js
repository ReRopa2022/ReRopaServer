const Donation = require("../models/donationModel");
const Stats = require("../models/statsModel");

//const BookOrGameDonation = require("../models/donationBookOrGameModel");

const getClothesByQuantityAndDate = async (req, res) => {
  try {
    const result = await Donation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },

      { $sort: { date: 1 } },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.send(error);
  }
};

const entriesCounter = async (req, res) => {
  try {
    var stats = await Stats.findOne({ type: "entries" });

    if (!stats) {
      var stat = await Stats.create({
        type: "entries",
        counter: 1,
      });
    } else {
      await Stats.findOneAndUpdate(
        {
          type: "entries",
        },
        { $inc: { counter: 1 } }
      );
    }
    if (stat) {
      res.status(200).json({
        status: "Success",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: err,
    });
  }
  res.status(200).json("Server is live");
};

const donateCounter = async (req, res) => {
  try {
    var stats = await Stats.findOne({ type: "donations" });

    if (!stats) {
      var stat = await Stats.create({
        type: "donations",
        counter: 1,
      });
    } else {
      await Stats.findOneAndUpdate(
        {
          type: "donations",
        },
        { $inc: { counter: 1 } }
      );
    }
    if (stat) {
      res.status(200).json({
        status: "Success",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: err,
    });
  }
};

module.exports = { getClothesByQuantityAndDate, entriesCounter, donateCounter };
