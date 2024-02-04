import { Schema, model } from "mongoose";

/**
 * Flight Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} FlightSchema
 *
 * @property {number} price - The price of the flight (required).
 * @property {string} departLocation - The departure location of the flight (required).
 * @property {string} arrivalLocation - The arrival location of the flight (required).
 * @property {Date} departTime - The departure time of the flight (required).
 * @property {Date} arrivalTime - The arrival time of the flight (required).
 * @property {number} seatsLeft - The number of seats left for the flight (required).
 * @property {boolean} intraProvince - If the flight is within the same province (required).
 */
const flightSchema = new Schema({
  price: { type: Number, required: true },
  seatsLeft: { type: Number, required: true },
  departLocation: { type: String, required: true },
  arrivalLocation: { type: String, required: true },
  intraProvince: { type: Boolean, required: true },
  departTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
});

export default model("Flight", flightSchema);
