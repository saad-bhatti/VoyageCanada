//////// Imports ////////
// Models
const User = require("../models/user");
const Flight = require("../models/flight");
// Prepare data functions
const { flightByObj } = require("./prepare");

/* Get the cart from the client's account */
// NOTE: The client must be authenticated
const getCart = function (args, context) {
  if (!context.req.id) throw new Error("Access denied");
  // Search for the user
  User.findById(context.req.id)
    .then((user) => {
      if (!user) throw new Error("Client account not found"); // Account not found
      if (user.cart.length === 0) return [];
      // Prepare the data in the array to be returned
      return user.cart.map((flight) => {
        return flightByObj(flight);
      });
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Add a flight to the client's cart, given the flight's id */
// NOTE: The client must be authenticated
const addToCart = function (args, context) {
  if (!context.req.id) throw new Error("Access denied");
  let userObj;
  // Search for the user
  return User.findById(context.req.id)
    .then((user) => {
      userObj = user;
      if (!user) throw new Error("Client account not found");
      // Search if the flightId already exists in the cart
      if (user.cart.indexOf(args.flightId) > -1)
        throw new Error("The flight is already added to the user's cart");
      else return Flight.findById(args.flightId); // Search for the flight
    })
    .then((flight) => {
      if (!flight) throw new Error("The specified flight does not exist");
      else {
        // Add the flight to the client's cart and update to database
        userObj.cart.push(flight);
        return userObj.save();
      }
    })
    .then((updatedUser) => {
      // Prepare the data in the array to be returned
      return updatedUser.cart.map((flight) => {
        return flightByObj(flight);
      });
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Remove a flight from the client's cart, given the flight's id */
// NOTE: The client must be authenticated
const removeFromCart = function (args, context) {
  if (!context.req.id) throw new Error("Access denied");
  // Search for the user
  return User.findById(context.req.id)
    .then((user) => {
      if (!user) throw new Error("Client account not found");
      // Search if the flightId exists in the cart
      let index = user.cart.indexOf(args.flightId);
      if (index === -1) throw new Error("The specified flight is not in the user's cart");
      else {
        // Remove the flight from the cart and update to database
        user.cart.splice(index, 1);
        return user.save();
      }
    })
    .then((updatedUser) => {
      // Prepare the data in the array to be returned
      return updatedUser.cart.map((flight) => {
        return flightByObj(flight);
      });
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Move all flights from the client's cart to the client's history */
// NOTE: The client must be authenticated
const completeOrder = function (args, context) {
  if (!context.req.id) throw new Error("Access denied");
  // Search for the user
  return User.findById(context.req.id)
    .then((user) => {
      if (!user) throw new Error("Client account not found");
      // Copy the contents of the cart to history
      for (const flightId of user.cart) {
        user.history.push(copy(flightId));
      }
      // Delete the contents of the cart
      user.splice(0, user.cart.length);
      // Update the user
      return user.save();
    })
    .then((updatedUser) => {
      // Prepare the data in the array to be returned
      return updatedUser.history.map((flight) => {
        return flightByObj(flight);
      });
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Export the functions */
module.export = {
  getCart,
  addToCart,
  removeFromCart,
  completeOrder,
};
