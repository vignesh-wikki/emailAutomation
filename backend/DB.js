const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.DB_STRING;

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
