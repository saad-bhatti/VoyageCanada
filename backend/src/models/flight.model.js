import { Schema, model } from "mongoose";

/**
 * Flight Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} FlightSchema
 *
 * @property {string} airline - The airline of the flight (required).
 * @property {string} flightNum - The flight number of the flight (required).
 * @property {string} departCity - The departure city of the flight (required).
 * @property {string} arriveCity - The arrival city of the flight (required).
 * @property {Date} departDate - The departure time of the flight (required).
 * @property {Date} arriveDate - The arrival time of the flight (required).
 * @property {number} price - The price of the flight ticket (required).
 * @property {number} seatsLeft - The number of seats left on the flight (required).
 */
const flightSchema = new Schema({
  airline: { type: String, required: true },
  flightNum: { type: String, required: true },
  departCity: { type: String, required: true },
  arriveCity: { type: String, required: true },
  departDate: { type: Date, required: true },
  arriveDate: { type: Date, required: true },
  price: { type: Number, required: true },
  seatsLeft: { type: Number, required: true },
});

export default model("Flight", flightSchema);
