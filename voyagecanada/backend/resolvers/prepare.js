//////// Imports ////////
// Models
const User = require("../models/user");
const Address = require("../models/address");
const Flight = require("../models/flight");

///////////////////////////// User /////////////////////////////
/* Prepare information returned for a user, given the user object */
const userByObj = (user) => {
  return {
    ...user._doc, // Remove metadata
    _id: user.id, // Make _id accessible
    password: null, // Make password inaccessible
    addresses: addressesArray.bind(this, user._doc.addresses), // Pass array of address ids
    cart: flightsArray.bind(this, user._doc.cart), // Pass array of flight ids
    history: flightsArray.bind(this, user._doc.history), // Pass array of flight ids
  };
};

/* Prepare information returned for a user, given the user's id */
const userById = (_id) => {
  // Search for the user
  return User.findOne({ _id: _id })
    .then((user) => {
      return userByObj(user);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

///////////////////////////// Address /////////////////////////////
/* Prepare information returned for a address, given the address object */
const addressByObj = (address) => {
  return {
    ...address._doc, // Remove metadata
    _id: address.id, // Make _id accessible
    owner: userById.bind(this, address._doc.owner), // Pass owner id
  };
};

/* Prepare information returned for a address, given the address' id */
const addressById = (_id) => {
  // Search for the address
  return Address.findOne({ _id: _id })
    .then((address) => {
      return addressByObj(address);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Prepare information returned for an array of address ids */
const addressesArray = (address_ids) => {
  return Address.find({ _id: { $in: address_ids } }) // Find addresses only in the array
    .then((addresses) => {
      // Loop over each address and prepare the info
      return addresses.map((address) => {
        return addressById(address.id);
      });
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

///////////////////////////// Flight /////////////////////////////
/* Prepare information returned for a flight, given the flight object */
const flightByObj = (flight) => {
  return {
    ...flight._doc, // Remove metadata
    _id: flight.id, // Make _id accessible
    password: null, // Make password inaccessible
  };
};

/* Prepare information returned for a flight, given the flight's id */
const flightById = (_id) => {
  // Search for the flight
  return Flight.findOne({ _id: _id })
    .then((flight) => {
      return flightByObj(flight);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Prepare information returned for an array of flight ids */
const flightsArray = (flight_ids) => {
  return Flight.find({ _id: { $in: flight_ids } }) // Find flights only in the array
    .then((flights) => {
      // Loop over each flight and prepare the info
      return flights.map((flight) => {
        return flightById(flight.id);
      });
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Export the functions */
module.exports = {
  userByObj,
  userById,
  addressByObj,
  addressById,
  addressesArray,
  flightByObj,
  flightById,
  flightsArray,
};
