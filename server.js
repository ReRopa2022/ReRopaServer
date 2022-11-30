const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const colors = require("colors");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

app.use(cors());

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/donate", require("./routes/donationRoute"));

app.listen(port, () => console.log("Backend server live on " + port));

module.exports = app;
