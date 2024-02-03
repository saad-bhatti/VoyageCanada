import UserModel from "../models/user.model.js";
import AddressModel from "../models/address.model.js";
import { prepareAddressByObject } from "../utils/prepareInfo.js";
import { sanitizeContent } from "../utils/validateInput.js";

/* Return an address specified by its _id */
// NOTE: The client id must match the owner id
const getAddressById = async (args, context) => {
  // Ensure the client is authenticated
  if (!context.req.id) throw new Error("Access denied");
  const userId = context.req.id;

  const addressId = args._id;
  try {
    // Part 1: Ensure the address exists
    const address = await AddressModel.findOne({ _id: addressId });
    if (!address) throw new Error("Address not found");
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
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
    street: sanitizeContent(args.addressInput.street),
    city: sanitizeContent(args.addressInput.city),
    postalCode: sanitizeContent(args.addressInput.postalCode),
    province: sanitizeContent(args.addressInput.province),
    owner: context.req.id,
  });
  // Add the new address to the database
  let addAdrressProm = newAddress.save();
  // Update the user to contain the new address' id
  let updateUserProm = addAdrressProm.then((address) => {
    return findOne({ _id: context.req.id }).then((user) => {
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

/* User-related resolvers. */
export default {
  getAddressById,
  createAddress,
};
