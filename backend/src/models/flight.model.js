import { Schema, model } from "mongoose";

/**
 * Flight Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} FlightSchema
 *
 * @property {number} price - The price of the flight (required).
 * @property {number} daysUntilFlight - The number of days until the flight (required).
 * @property {string} departTime - The departure time of the flight (required).
 * @property {string} departLoc - The departure location of the flight (required).
 * @property {string} arrTime - The arrival time of the flight (required).
 * @property {string} arrLoc - The arrival location of the flight (required).
 * @property {number} seatsLeft - The number of seats left for the flight (required).
 * @property {boolean} intraProvince - If the flight is within the same province (required).
 */
const flightSchema = new Schema({
  price: { type: Number, required: true },
  daysUntilFlight: { type: Number, required: true },
  departTime: { type: String, required: true },
  departLoc: { type: String, required: true },
  arrTime: { type: String, required: true },
  arrLoc: { type: String, required: true },
  seatsLeft: { type: Number, required: true },
  intraProvince: { type: Boolean, required: true },
});

export default model("Flight", flightSchema);
