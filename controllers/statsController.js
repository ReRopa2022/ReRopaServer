const Donation = require("../models/donationModel");
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

module.exports = { getClothesByQuantityAndDate };
