// Mongoose
const mongoose = require("mongoose");
// Schema package
const Schema = mongoose.Schema;

// Create schema for billing
const addressSchema = new Schema({
  // Fields
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
    uppercase: true,
    minLength: [6, "{VALUE} is an invalid postal code"], // Ensure length of 6
    maxLength: [6, "{VALUE} is an invalid postal code"],
  },
  province: {
    type: String,
    required: true,
    enum: { // Ensure the province is one of the following
      values: [
        "AB",
        "BC",
        "MB",
        "NB",
        "NL",
        "NS",
        "ON",
        "PE",
        "QC",
        "SK",
      ],
      message: "{VALUE} is an invalid province or territory",
    },
  },
  // References to other models
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Define and export billing model
module.exports = mongoose.model("Address", addressSchema);
