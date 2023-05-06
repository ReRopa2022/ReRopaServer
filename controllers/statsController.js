const Donation = require("../models/donationModel");
const Stats = require("../models/statsModel");
const Click = require("../models/clickModel");

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

async function addToEntryClicksList(req, res) {
  try {
    const newClick = new Click({
      type: "entry",
      date: new Date(),
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

async function addToDonateClicksList(req, res) {
  try {
    const newClick = new Click({
      type: "donation",
      date: new Date(),
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

async function getEntryClicksList(req, res) {
  try {
    const stats = await Stats.findOne({});
    const entryClicks = stats.entryClicks;
    const entryClicksByDate = entryClicks.reduce((acc, click) => {
      const date = click.date.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const result = Object.keys(entryClicksByDate).map((date) => ({
      date,
      count: entryClicksByDate[date],
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function getDonationClicksList(req, res) {
  try {
    const stats = await Stats.findOne({});
    const donationClicks = stats.donationClicks;
    const donateClicksByDate = donationClicks.reduce((acc, click) => {
      const date = click.date.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const result = Object.keys(donateClicksByDate).map((date) => ({
      date,
      count: donateClicksByDate[date],
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function getAllStats(req, res) {
  try {
    const stats = await Stats.findOne({});
    res.json(stats);
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
  getDonationClicksList,
  getAllStats,
};
