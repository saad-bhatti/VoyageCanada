import AddressModel from "../models/address.model.js";
import FlightModel from "../models/flight.model.js";
import TicketModel from "../models/ticket.model.js";
import UserModel from "../models/user.model.js";

/**
 * Prepares a user object for return, given the raw user object.
 *
 * @param {User} userObject - The user object to be processed.
 * @returns {{
 *   _id: string,
 *   email: string,
 *   name: string,
 *   contact: string,
 *   addresses: Array<Address>,
 *   cart: Array<Flight>,
 *   history: Array<Flight>
 * }} Prepared user information.
 *
 * @throws {Error} If the provided user object is not a valid object.
 */
export const prepareUserByObject = (userObject) => {
  return {
    ...userObject._doc, // Remove metadata
    _id: userObject.id,
    password: null,
    addresses: prepareAddressArray.bind(this, userObject._doc.addresses),
    cart: prepareFlightArray.bind(this, userObject._doc.cart),
    purchases: prepareTicketArray.bind(this, userObject._doc.purchases),
  };
};

/**
 * Prepares an address object for return, given the raw address object.
 *
 * @param {Address} addressObject - The raw address object to be processed.
 * @returns {{
 *   _id: string,
 *   street: string,
 *   city: string,
 *   postalCode: string,
 *   province: string,
 *   owner: User
 * }} Prepared address information.
 *
 * @throws {Error} If the provided address object is not a valid object.
 */
export const prepareAddressByObject = (addressObject) => {
  return {
    ...addressObject._doc, // Remove metadata
    _id: addressObject.id,
    owner: prepareUserById.bind(this, addressObject._doc.owner),
  };
};

/**
 * Prepares a flight object for return, given the raw flight object.
 *
 * @param {Flight} flightObject - The raw flight object to be processed.
 * @returns {{
 *   _id: string,
 *   airline: string,
 *   flightNum: string,
 *   departCity: string,
 *   arriveCity: string,
 *   departDate: string,
 *   arriveDate: string,
 *   price: number,
 *   seatsLeft: number,
 * }} Prepared flight information.
 *
 * @throws {Error} If the provided flight object is not a valid object.
 */
export const prepareFlightByObject = (flightObject) => {
  return {
    ...flightObject._doc,
    _id: flightObject.id,
    departDate: flightObject.departDate.toISOString(),
    arriveDate: flightObject.arriveDate.toISOString(),
  };
};

/**
 * Prepares a ticket object for return, given the raw ticket object.
 *
 * @param {Ticket} ticketObject - The raw ticket object to be processed.
 * @returns {{
 *   _id: string,
 *   flightId: Flight,
 *   totalPrice: number,
 *   purchaseDate: string,
 *   owner: User
 * }} Prepared ticket information.
 *
 * @throws {Error} If the provided ticket object is not a valid object.
 */
export const prepareTicketByObject = (ticketObject) => {
  return {
    ...ticketObject._doc, // Remove metadata
    _id: ticketObject.id,
    flight: prepareFlightById.bind(this, ticketObject._doc.flight),
    purchaseDate: ticketObject.purchaseDate.toISOString(),
    owner: prepareUserById.bind(this, ticketObject._doc.owner),
  };
};

/**
 * Prepares a user object for return, given the user's id.
 *
 * @param {string} userId - The user's id.
 * @returns {Promise<User>} A promise that resolves to the prepared user information.
 *
 * @throws {Error} If the userId is not valid or there's an error while fetching the user.
 */
const prepareUserById = async (userId) => {
  // Search for the user and return the prepared information.
  try {
    const rawUser = await UserModel.findById(userId);
    if (!rawUser) throw new Error("A user with id " + userId + " does not exist");
    return prepareUserByObject(rawUser);
  } catch (err) {
    // Throw error for graphql to handle.
    throw err;
  }
};

/**
 * Prepares an array of address objects for return, given an array of address ids.
 *
 * @param {Array<ObjectId>} addressIds - The array of address ids.
 * @returns {
 * Promise<Array<Address>>
 * } A promise that resolves to the array of prepared address information.
 *
 * @throws {Error} If there's an error while fetching the addresses.
 */
const prepareAddressArray = async (addressIds) => {
  try {
    // Search for the addresses found in the array.
    const rawAddresses = await AddressModel.find({ _id: { $in: addressIds } });
    if (!rawAddresses) throw new Error("No addresses found");

    // Loop over each raw address and prepare the information.
    return rawAddresses.map((rawAddress) => {
      return prepareAddressByObject(rawAddress);
    });
  } catch (err) {
    // Throw error for graphql to handle.
    throw err;
  }
};

/**
 * Prepares a flight object for return, given the flight's id.
 *
 * @param {string} flightId - The flight's id.
 * @returns {Promise<Flight>} A promise that resolves to the prepared flight information.
 *
 * @throws {Error} If the flightId is not valid or there's an error while fetching the flight.
 */
const prepareFlightById = async (flightId) => {
  // Search for the flight and return the prepared information.
  try {
    const rawFlight = await FlightModel.findById(flightId);
    if (!rawFlight) throw new Error("A flight with id " + flightId + " does not exist");
    return prepareFlightByObject(rawFlight);
  } catch (err) {
    // Throw error for graphql to handle.
    throw err;
  }
};

/**
 * Prepares an array of flight objects for return, given an array of flight ids.
 *
 * @param {Array<ObjectId>} flightIds - The array of flight ids.
 * @returns {
 * Promise<Array<Flight>>
 * } A promise that resolves to the array of prepared flight information.
 *
 * @throws {Error} If there's an error while fetching the flights.
 */
const prepareFlightArray = async (flightIds) => {
  try {
    // Search for the flights found in the array.
    const rawFlights = await FlightModel.find({ _id: { $in: flightIds } });
    if (!rawFlights) throw new Error("No flights found");

    // Loop over each raw flight and prepare the information.
    return rawFlights.map((rawFlight) => {
      return prepareFlightByObject(rawFlight);
    });
  } catch (err) {
    // Throw error for graphql to handle.
    throw err;
  }
};

/**
 * Prepares an array of ticket objects for return, given an array of ticket ids.
 *
 * @param {Array<ObjectId>} ticketIds - The array of ticket ids.
 * @returns {
 * Promise<Array<Ticket>>
 * } A promise that resolves to the array of prepared ticket information.
 *
 * @throws {Error} If there's an error while fetching the tickets.
 */
const prepareTicketArray = async (ticketIds) => {
  try {
    // Search for the tickets found in the array.
    const rawTickets = await TicketModel.find({ _id: { $in: ticketIds } });
    if (!rawTickets) throw new Error("No tickets found");

    // Loop over each raw ticket and prepare the information.
    return rawTickets.map((rawTicket) => {
      return prepareTicketByObject(rawTicket);
    });
  } catch (err) {
    // Throw error for graphql to handle.
    throw err;
  }
};
