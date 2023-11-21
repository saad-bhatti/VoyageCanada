// Mongoose
const mongoose = require("mongoose");
// Schema package
const Schema = mongoose.Schema;

// Create schema for flight
const userSchema = new Schema({
  // Fields
  price: {
    type: Number,
    required: true,
  },
  daysUntilFlight: {
    type: Number,
    required: true,
  },
  departTime: {
    type: String,
    required: true,
  },
  departLoc: {
    type: String,
    required: true,
  },
  arrTime: {
    type: String,
    required: true,
  },
  arrLoc: {
    type: String,
    required: true,
  },
  seatsLeft: {
    type: Number,
    required: true,
  },
  intraProvince: {
    type: Boolean,
    required: true,
  },
});

// Define and export user model
module.exports = mongoose.model("Flight", userSchema);
