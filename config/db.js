//Connecting to db
const colors = require("colors");
const mongoose = require("mongoose");

//For cloud running
//process.env.MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

//For local running
//MONGO_LOCAL_URI
const connectLocalDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCAL_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = { connectDB, connectLocalDB };
