import AddressModel from "../models/address.model.js";
import FlightModel from "../models/flight.model.js";
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
    history: prepareFlightArray.bind(this, userObject._doc.history),
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
 *   price: number,
 *   daysUntilFlight: number,
 *   departTime: string,
 *   departLoc: string,
 *   arrTime: string,
 *   arrLoc: string,
 *   seatsLeft: number,
 *   intraProvince: boolean
 * }} Prepared flight information.
 *
 * @throws {Error} If the provided flight object is not a valid object.
 */
export const prepareFlightByObject = (flightObject) => {
  return {
    ...flightObject._doc, // Remove metadata
    _id: flightObject.id,
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
    const rawUser = await UserModel.findOne({ _id: userId });
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
 * @param {Array<string>} addressIds - The array of address ids.
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
 * Prepares an array of flight objects for return, given an array of flight ids.
 *
 * @param {Array<string>} flightIds - The array of flight ids.
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
