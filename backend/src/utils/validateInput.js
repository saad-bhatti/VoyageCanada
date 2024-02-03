import validator from "validator";
import TokenModel from "../models/token.model.js";

/**
 * Verifies the provided email address is valid.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} True if the email is valid, false otherwise.
 *
 * @throws {Error} If the provided email is not a valid string.
 */
export const isValidEmail = (email) => {
  const isValid = validator.isEmail(email);
  if (!isValid) throw new Error("Invalid email address");
};

/**
 * Verifies the provided password has the following:
 *  - length of at least 8 characters
 *  - contains at least one uppercase character
 *  - contains at least one number
 *  - contains at least one symbol
 *
 * @param {string} password - The password to be validated.
 * @returns {boolean} True if the password is valid, false otherwise.
 *
 * @throws {Error} If the provided password is not a valid string.
 */
export const isValidPassword = (password) => {
  const isValid = validator.isStrongPassword(password, {
    minLength: 8,
    minUpperCase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
  if (!isValid) throw new Error("The password does not meet the requirements");
};

/**
 * Verifies the provided contact information is valid.
 *
 * @param {string} contact - The contact information to be validated.
 * @returns {boolean} True if the contact information is valid, false otherwise.
 *
 * @throws {Error} If the provided contact information is not a valid string.
 */
export const isValidContact = (contact) => {
  const isValid = validator.isMobilePhone(contact);
  if (!isValid) throw new Error("Invalid contact information");
};

/**
 * Verifies the the client is authenticated by checking the token exists in the database.
 *
 * @param {string} requestId - The id of the user to be validated.
 * @param {string} requestToken - The token to be validated.
 *
 * @throws {Error} If the requestId is empty or the token is not in the database.
 */
export const isAuthenticated = async (requestId, requestToken) => {
  try {
    // Part 1: Ensure the client is authenticated
    if (!requestId) throw new Error("Access denied");

    // Part 2: Ensure the token exists in the database
    const tokenExists = await TokenModel.findOne({ token: requestToken });
    if (!tokenExists) throw new Error("Token does not exist in the database");

    return requestId;
  } catch (err) {
    throw err;
  }
};

/**
 * Replaces <, >, &, ', " and / with HTML entities and trims whitespace.
 *
 * @param {string} inputStr - The input string to be sanitized.
 * @returns {string} The sanitized string.
 *
 * @throws {Error} If the provided input string is not a valid string.
 */
export const sanitizeContent = (inputStr) => validator.trim(validator.escape(inputStr));
