// Mongoose
const mongoose = require("mongoose");
// Schema package
const Schema = mongoose.Schema;

// Create schema for user
const userSchema = new Schema({
  // Fields
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  // References to other models
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
});

// Define and export user model
module.exports = mongoose.model("User", userSchema);
