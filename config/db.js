//Connecting
const colors = require("colors");
const mongoose = require("mongoose");

//For cloud running
//process.env.MONGO_URI

//For local running
//MONGO_LOCAL_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ReRopa:reropadarg1@reropa.qmtfdmz.mongodb.net/test"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
