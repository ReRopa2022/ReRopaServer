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

// Function to add a new click to the entry clicks list
async function addToEntryClicksList(req, res) {
  try {
    const newClick = new Click({
      type: "entry",
    });
    const stats = await Stats.findOneAndUpdate(
      {},
      { $push: { entryClicks: newClick } },
      { new: true, upsert: true }
    );
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// Function to add a new click to the donation clicks list
async function addToDonateClicksList(req, res) {
  try {
    const newClick = new Click({
      type: "donation",
    });
    const stats = await Stats.findOneAndUpdate(
      {},
      { $push: { donationClicks: newClick } },
      { new: true, upsert: true }
    );
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// Function to get the list of entry clicks
async function getEntryClicksList(req, res) {
  try {
    const stats = await Stats.findOne({});
    res.json(stats.entryClicks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// Function to get the list of donation clicks
async function getDonateClicksList(req, res) {
  try {
    const stats = await Stats.findOne({});
    res.json(stats.donationClicks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getClothesByQuantityAndDate,
  addToEntryClicksList,
  addToDonateClicksList,
  getEntryClicksList,
  getDonateClicksList,
};
