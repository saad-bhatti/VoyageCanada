// const Flight = require("../models/flight");
// const { flightByObj } = require("./prepare").default.default;

// /* Return an array of all the flights in the database */
// const getFlights = function (args, context) {
//   // Search for all flights in the database
//   return Flight.find()
//   .then((flights) => {
//     // Prepare the data in the array to be returned
//     return flights.map(flight => {
//       return flightByObj(flight);
//     });
//   })
//   .catch((err) => {
//     throw err; // Throw error for graphql to handle
//   });
// };

// /* Export the functions */
// module.exports = {
//   getFlights,
// };
