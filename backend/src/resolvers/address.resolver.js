import { isValidObjectId } from "mongoose";
import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";
import { prepareAddressByObject } from "../utils/prepareInfo.js";
import { isAuthenticated, sanitizeContent } from "../utils/validateInput.js";

/**
 * Retrieves an address specified by its ID.
 *
 * @param {Object} args - The input arguments containing the address ID.
 * @param {string} args.addressId - The ID of the address to retrieve.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<Address>} A promise that resolves to the prepared address object.
 *
 * @throws {Error} If the client is not authenticated, the address ID is invalid, the address is not
 * found, or the authenticated user is not the owner of the address.
 */
const getAddressById = async (args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitize and verify the inputs
    const addressId = sanitizeContent(args.addressId);
    if (!isValidObjectId(addressId)) throw new Error("Invalid address id");

    // Part 2: Retrieve the address
    const address = await AddressModel.findById(addressId);
    if (!address) throw new Error("Address not found");

    // Part 3: Match the owner id to the user id
    if (userId !== address.owner.toString()) throw new Error("Access denied");

    // Part 3: Prepare the data to be returned
    return prepareAddressByObject(address);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Creates and returns a new address, given the relevant inputs.
 *
 * @param {Object} args - The input arguments containing address details.
 * @param {string} args.street - The street address.
 * @param {string} args.city - The city of the address.
 * @param {string} args.postalCode - The postal code of the address.
 * @param {string} args.province - The province or territory of the address.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<Address>} A promise that resolves to the prepared address object.
 *
 * @throws {Error} If the client is not authenticated, or there's an error creating the address.
 */
const createAddress = async (args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitize the inputs
    const street = sanitizeContent(args.street);
    const city = sanitizeContent(args.city);
    const postalCode = sanitizeContent(args.postalCode);
    const province = sanitizeContent(args.province);

    // Part 2: Create the new address
    const newAddress = await AddressModel.create({
      street,
      city,
      postalCode,
      province,
      owner: userId,
    });

    // Part 3: Add the address id to the user's addresses
    await UserModel.findByIdAndUpdate(userId, {
      $push: { addresses: newAddress._id },
    });

    // Part 4: Prepare the data to be returned
    return prepareAddressByObject(newAddress);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Updates an address specified by its ID.
 *
 * @param {Object} args - The input arguments containing the address ID and updated details.
 * @param {string} args.addressId - The ID of the address to update.
 * @param {string} args.street - The updated street address.
 * @param {string} args.city - The updated city of the address.
 * @param {string} args.postalCode - The updated postal code of the address.
 * @param {string} args.province - The updated province or territory of the address.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<Address>} A promise that resolves to the prepared updated address object.
 *
 * @throws {Error} If the client is not authenticated, the address ID is invalid, the address is not
 * found, or the authenticated user is not the owner of the address.
 */
const updateAddress = async (args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitize and verify the address id
    const addressId = sanitizeContent(args.addressId);
    if (!isValidObjectId(addressId)) throw new Error("Invalid address id");

    // Part 2: Sanitize the inputs
    const street = sanitizeContent(args.street);
    const city = sanitizeContent(args.city);
    const postalCode = sanitizeContent(args.postalCode);
    const province = sanitizeContent(args.province);

    // Part 3: Retrieve the address
    const address = await AddressModel.findById(addressId);
    if (!address) throw new Error("Address not found");

    // Part 4: Match the owner id to the user id
    if (userId !== address.owner.toString()) throw new Error("Access denied");

    // Part 5: Update the address
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      { street: street, city: city, postalCode: postalCode, province: province },
      { new: true }
    );

    // Part 6: Prepare the data to be returned
    return prepareAddressByObject(updatedAddress);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Deletes an address specified by its ID.
 *
 * @param {Object} args - The input arguments containing the address ID.
 * @param {string} args.addressId - The ID of the address to delete.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<string>} A promise that resolves to a success message.
 *
 * @throws {Error} If the client is not authenticated, the address ID is invalid, the address is not
 * found, or the authenticated user is not the owner of the address.
 */
const deleteAddress = async (args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitize and verify the inputs
    const addressId = sanitizeContent(args.addressId);
    if (!isValidObjectId(addressId)) throw new Error("Invalid address id");

    // Part 2: Retrieve the address
    const address = await AddressModel.findById(addressId);
    if (!address) throw new Error("Address not found");

    // Part 3: Match the owner id to the user id
    if (userId !== address.owner.toString()) throw new Error("Access denied");

    // Part 4: Delete the address
    await AddressModel.findByIdAndDelete(addressId);

    // Part 5: Remove the address id from the user's addresses
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { addresses: addressId },
    });

    // Part 6: Prepare the data to be returned
    return "Address successfully deleted!";
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/* Address-related resolvers. */
export default {
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
