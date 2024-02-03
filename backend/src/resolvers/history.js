// //////// Imports ////////
// // Models
// const User = require("../models/user");
// // Prepare data functions
// const { flightByObj } = require("./prepare").default.default;

// /* Get the history from the client's account */
// // NOTE: The client must be authenticated
// const getHistory = function (args, context) {
//   if (!context.req.id) throw new Error("Access denied");
//   // Search for the user
//   User.findById(context.req.id)
//     .then((user) => {
//       if (!user) throw new Error("Client account not found"); // Account not found
//       // Prepare the data in the array to be returned
//       return user.history.map((flight) => {
//         return flightByObj(flight);
//       });
//     })
//     .catch((err) => {
//       throw err; // Throw error for graphql to handle
//     });
// };

// /* Remove a flight from the client's history, given the flight's id */
// // NOTE: The client must be authenticated
// const removeFromHistory = function (args, context) {
//   if (!context.req.id) throw new Error("Access denied");
//   // Search for the user
//   return User.findById(context.req.id)
//     .then((user) => {
//       if (!user) throw new Error("Client account not found");
//       // Search if the flightId exists in history
//       let index = user.history.indexOf(args.flightId);
//       if (index === -1) throw new Error("The specified flight is not in the user's history");
//       else {
//         // Remove the flight from history and update to database
//         user.history.splice(index, 1);
//         return user.save();
//       }
//     })
//     .then((updatedUser) => {
//       // Prepare the data in the array to be returned
//       return updatedUser.history.map((flight) => {
//         return flightByObj(flight);
//       });
//     })
//     .catch((err) => {
//       throw err; // Throw error for graphql to handle
//     });
// };

// /* Export the functions */
// module.exports = {
//   getHistory,
//   removeFromHistory,
// };
