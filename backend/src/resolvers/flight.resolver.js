import { isValidObjectId } from "mongoose";
import FlightModel from "../models/flight.model.js";
import { prepareFlightByObject } from "../utils/prepareInfo.js";
import { sanitizeContent } from "../utils/validateInput.js";

/**
 * Retrieves a list of flights based on pagination parameters.
 *
 * @param {Object} args - The input arguments containing pagination parameters.
 * @param {number} args.pageNum - The page number to retrieve.
 * @param {number} args.pageSize - The number of flights per page.
 * @param {Object} _context - The context object (unused in this function).
 *
 * @returns {Promise<Array<Flight>>} A promise that resolves to an array of flight objects.
 *
 * @throws {Error} If the page number is invalid or an error occurs during the retrieval.
 */
const getFlights = async function (args, _context) {
  try {
    // Part 1: Sanitize and verify the inputs
    const pageNum = sanitizeContent(args.pageNum);
    const pageSize = sanitizeContent(args.pageSize);
    if (page <= 0) throw new Error("Invalid page number");

    // Part 2: Retrieve the flights on the specified page
    const flights = await FlightModel.find({})
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize);

    // Part 3: Prepare the data to be returned
    return flights.map((flight) => prepareFlightByObject(flight));
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Retrieves a flight specified by its ID.
 *
 * @param {Object} args - The input arguments containing the flight ID.
 * @param {string} args.flightId - The ID of the flight to retrieve.
 * @param {Object} _context - The context object (unused in this function).
 *
 * @returns {Promise<Flight>} A promise that resolves to a flight object.
 *
 * @throws {Error} If the flight ID is invalid, the flight is not found, or an error occurs during
 * the retrieval.
 */
const getFlightById = async function (args, _context) {
  try {
    // Part 1: Sanitize and verify the inputs
    const flightId = sanitizeContent(args.flightId);
    if (!isValidObjectId(flightId)) throw new Error("Invalid flight id");

    // Part 2: Retrieve the flight
    const flight = await FlightModel.findById(flightId);
    if (!flight) throw new Error("Flight not found");

    // Part 3: Prepare the data to be returned
    return prepareFlightByObject(flight);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Retrieves a list of flights based on the departure location.
 *
 * @param {Object} args - The input arguments containing the departure location.
 * @param {string} args.location - The departure location to filter flights.
 * @param {Object} _context - The context object (unused in this function).
 *
 * @returns {Promise<Array<Flight>>} A promise that resolves to an array of flight objects.
 *
 * @throws {Error} If an error occurs during the retrieval.
 */
const getFlightsByLocation = async function (args, _context) {
  try {
    // Part 1: Sanitize and verify the inputs
    const departLocation = sanitizeContent(args.location);

    // Part 2: Retrieve the flights
    const flights = await FlightModel.find({ departLocation: departLocation });

    // Part 3: Prepare the data to be returned
    return flights.map((flight) => prepareFlightByObject(flight));
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Retrieves a list of flights based on the departure date.
 *
 * @param {Object} args - The input arguments containing the departure date.
 * @param {string} args.date - The departure date to filter flights (in DD-MM-YYYY format).
 * @param {Object} _context - The context object (unused in this function).
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of flight objects.
 *
 * @throws {Error} If the date format is invalid, an error occurs during the retrieval.
 */
const getFlightsByDate = async function (args, _context) {
  try {
    // Part 1: Sanitize and verify the input
    const date = sanitizeContent(args.date);
    if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
      throw new Error("Invalid date format. Please provide a date in the format DD-MM-YYYY.");
    }

    // Part 2: Retrieve the flights
    const flights = await FlightModel.find({
      departTime: {
        $gte: new Date(date + "T00:00:00Z"),
        $lt: new Date(date + "T23:59:59Z"),
      },
    });

    // Part 3: Prepare the data to be returned
    return flights.map((flight) => prepareFlightByObject(flight));
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/* Flight-related resolvers. */
export default {
  getFlights,
  getFlightById,
  getFlightsByLocation,
  getFlightsByDate,
};
