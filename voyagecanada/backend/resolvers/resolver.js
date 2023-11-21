//////// Imports ////////
// Resolvers
const userResolver = require("./user");
const addressResolver = require("./address");
const flightResolver = require("./flight");
const cartResolver = require("./cart");
const historyResolver = require("./history");

///////////////////////////// Graphql - Root /////////////////////////////
module.exports = {
  //////////////// User-resolvers ////////////////
  // User-related
  signin: userResolver.signinUser,
  getUserProfile: userResolver.getUserProfile,
  signout: userResolver.signoutUser,
  createUser: userResolver.createUser,
  changeEmail: userResolver.changeEmail,
  changePassword: userResolver.changePassword,
  changeContact: userResolver.changeContact,
  //////////////// Address-resolvers ////////////////
  getAddressById: addressResolver.getAddressById,
  createAddress: addressResolver.createAddress,
  //////////////// Flight-resolvers ////////////////
  getFlights: flightResolver.getFlights,
  //////////////// Cart-resolvers ////////////////
  getCart: cartResolver.getCart,
  addToCart: cartResolver.addToCart,
  removeFromCart: cartResolver.removeFromCart,
  completeOrder: cartResolver.completeOrder,
  //////////////// History-resolvers ////////////////
  getHistory: historyResolver.getHistory,
  removeFromHistory: historyResolver.removeFromHistory,
};
