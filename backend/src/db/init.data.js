import "dotenv/config";
import mongoose from "mongoose";
import env from "../utils/validateEnv.js";
import FlightModel from "../models/flight.model.js";
import FlightData from "./flight.data.js";

const initData = async () => {
  try {
    // Connect to MongoDB database
    await mongoose.connect(env.DATABASE_URL);
    console.log("Connected to MongoDB");

    // Delete all documents from the flights collection
    await FlightModel.deleteMany({});
    console.log("Deleted all documents from the flights collection");

    // Insert the flight data into the flights collection
    await FlightModel.insertMany(FlightData);
    console.log("Inserted flight data into the flights collection");

    // Disconnect from MongoDB database
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    // Display error to console
    console.log(err);
  }
  // Exit the process
  process.exit(0);
};

initData();
