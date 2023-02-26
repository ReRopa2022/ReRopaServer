const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/img/uploads", express.static("/public/img/uploads"));
const port = 5000 || process.env.PORT;

app.use(cors());

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/donate", require("./routes/donationRoute"));
app.use("/api/request", require("./routes/requestRoute"));
app.use("/api/location", require("./routes/locationRoute"));

app.listen(port, () => console.log("Backend server live on " + port));

module.exports = app;
