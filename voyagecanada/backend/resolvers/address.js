//////// Imports ////////
// Models
const User = require("../models/user");
const Address = require("../models/address");
// Prepare data functions
const { addressByObj } = require("./prepare");
// Validator
const validator = require("./validator");

//////// Queries ////////
/* Return an address specified by its _id */
// NOTE: The client id must match the owner id
const getAddressById = (args, context) => {
  if (!context.req.id) throw new Error("Access denied");
  return Address.findOne({ _id: args._id })
    .then((address) => {
      // Address does not exist
      if (!address) throw new Error("Address not found");
      // Address found but client id does not match owner id
      else if (context.req.id !== address.owner.toString()) throw new Error("Access denied");
      // Prepare the data to be returned
      else return addressByObj(address);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

//////// Mutations ////////
/* Create and return a new address, given the relevent inputs */
// NOTE: The client must be authenticated
const createAddress = (args, context) => {
  if (!context.req.id) throw new Error("Access denied");
  // Create the new address (Sanitize parameters)
  const newAddress = new Address({
    street: validator.sanitizeContent(args.addressInput.street),
    city: validator.sanitizeContent(args.addressInput.city),
    postalCode: validator.sanitizeContent(args.addressInput.postalCode),
    province: validator.sanitizeContent(args.addressInput.province),
    owner: context.req.id,
  });
  // Add the new address to the database
  let addAdrressProm = newAddress.save();
  // Update the user to contain the new address' id
  let updateUserProm = addAdrressProm.then((address) => {
    return User.findOne({ _id: context.req.id }).then((user) => {
      user.addresses.push(address);
      return user.save();
    });
  });
  // Call the promises and return the new address
  return Promise.all([addAdrressProm, updateUserProm])
    .then(([address, updatedUser]) => {
      // Prepare the data to be returned
      return addressByObj(address);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Export the functions */
module.exports = {
  getAddressById,
  createAddress,
};
