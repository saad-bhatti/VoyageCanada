import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import TokenModel from "../models/token.model.js";
import UserModel from "../models/user.model.js";
import { prepareUserByObject } from "../utils/prepareInfo.js";
import env from "../utils/validateEnv.js";
import * as Validator from "../utils/validateInput.js";

/**
 * Returns the user object of the authenticated client.
 *
 * @param {Object} _args - Unused parameters.
 * @param {Object} context - The context object containing information about the request.
 *
 * @returns {Promise<User>} A promise that resolves to the prepared user object.
 *
 * @throws {Error} If the client is not authenticated or there's an error while fetching the user.
 */
const getUserProfile = async (_args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await Validator.isAuthenticated(context.req.id, context.req.token);

    // Part 1: Search for the user
    const rawUser = await UserModel.findOne({ _id: userId });
    if (!rawUser) throw new Error("A user with id " + userId + " does not exist");

    // Part 2: Return the prepared user information
    return prepareUserByObject(rawUser);
  } catch (err) {
    throw err; // Throw error for graphql to handle.
  }
};

/**
 * Returns the user object given an email and password, and performs user authentication.
 *
 * @param {Object} args - The input arguments containing user credentials.
 * @param {string} args.email - The email address of the user.
 * @param {string} args.password - The password of the user.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<User>} A promise that resolves to the prepared user object.
 *
 * @throws {Error} If the user does not exist, the provided password is incorrect, or if there's an
 * error during authentication.
 */
const signIn = async (args, context) => {
  // Part 1: Sanitize input
  const email = Validator.sanitizeContent(args.email);
  const rawPassword = Validator.sanitizeContent(args.password);

  try {
    // Part 2: Search for the user by the provided email
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error(`User with email '${email}' does not exist`);

    // Part 3: Compare the provided password
    const isSame = await compare(rawPassword, user.password);
    if (!isSame) throw new Error("The given password is incorrect");

    // Part 4: Create token with user's id and store it in the database
    const token = jwt.sign({ id: user.id }, env.SECRET, { expiresIn: "2h" });
    const newToken = new TokenModel({
      token: token,
      expiresIn: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });
    await newToken.save();

    // Part 5: Store token in response cookies
    context.res.cookie("Authorization", token, { httpOnly: true });

    // Part 6: Prepare and return the user
    return prepareUserByObject(user);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Signs the authenticated client out from their account.
 *
 * @function
 * @param {Object} _args - Unused parameters.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {string} A success message upon signing out.
 *
 * @throws {Error} If the client is not authenticated or an error occurs during the sign out.
 */
const signOut = async (_args, context) => {
  // Ensure the client is authenticated
  if (!context.req.id) throw new Error("Access denied");
  try {
    // Delete the token from the database
    const token = context.req.token;
    await TokenModel.findOneAndDelete({ token: token });

    // Clear the token from the response cookies
    context.res.cookie("Authorization", "", { expires: new Date(0), httpOnly: true });

    // Return message upon success
    return "Successfully signed out";
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Creates and returns a new user based on the provided inputs.
 *
 * @async
 * @function
 * @param {Object} args - The input arguments containing user data.
 * @param {Object} args.userInput - The user input data.
 * @param {string} args.email - The email address of the user.
 * @param {string} args.password - The password of the user.
 * @param {string} args.name - The name of the new user.
 * @param {string} args.contact - The contact information of the new user.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<Object>} A promise that resolves to the prepared newly created user object.
 *
 * @throws {Error} If the inputs are invalid, the user with the provided email already exists,
 * or if there's an error during user creation.
 */
const signUp = async (args, context) => {
  try {
    // Part 1: Sanitation and validation of inputs
    const email = Validator.sanitizeContent(args.email);
    const rawPassword = Validator.sanitizeContent(args.password);
    const name = Validator.sanitizeContent(args.name);
    const contact = Validator.sanitizeContent(args.contact);

    Validator.isValidEmail(email);
    Validator.isValidPassword(rawPassword);
    Validator.isValidContact(contact);

    // Part 2: Search if user with given email already exists.
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) throw new Error(`User with email '${email}' already exists`);

    // Part 3: Create the new user
    const hashedPassword = await hash(rawPassword, 10);
    const newUser = new UserModel({
      email: email,
      password: hashedPassword,
      name: name,
      contact: contact,
    });
    const savedUser = await newUser.save();

    // Part 4: Create token with user's id and store it in the database
    const token = jwt.sign({ id: user.id }, env.SECRET, { expiresIn: "2h" });
    const newToken = new TokenModel({
      token: token,
      expiresIn: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });
    await newToken.save();

    // Part 5: Store token in response cookies
    context.res.cookie("Authorization", token, { httpOnly: true });

    // Part 6: Prepare and return the user
    return prepareUserByObject(savedUser);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Updates the email of an existing user, given the relevant input.
 *
 * @async
 * @function
 * @param {Object} args - The input arguments containing the new email.
 * @param {string} args.newEmail - The new email address for the user.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<Object>} A promise that resolves to the prepared updated user object.
 *
 * @throws {Error} If the client is not authenticated, the new email is invalid, or
 * if a user with the new email already exists.
 */
const changeEmail = async (args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await Validator.isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitation & Validation of input
    const newEmail = Validator.sanitizeContent(args.newEmail);
    Validator.isValidEmail(newEmail);

    // Part 2: Search if user with new email already exists
    const existingUser = await UserModel.findOne({ email: newEmail });
    if (existingUser) throw new Error(`User with email '${newEmail}' already exists`);

    // Part 3: Update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { email: newEmail },
      { new: true }
    );

    // Part 4: Prepare and return the user
    return prepareUserByObject(updatedUser);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Updates the password of an existing user, given the relevant input.
 *
 * @async
 * @function
 * @param {Object} args - The input arguments containing the old and new passwords.
 * @param {string} args.oldPassword - The old password for authentication.
 * @param {string} args.newPassword - The new password to be set for the user.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<Object>} A promise that resolves to the prepared updated user object.
 *
 * @throws {Error} If the client is not authenticated, the old password is incorrect, the user does
 * not exist, or if the new password is invalid.
 */
const changePassword = async (args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await Validator.isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitation & Validation of input
    const newPassword = Validator.sanitizeContent(args.newPassword);
    const oldPassword = Validator.sanitizeContent(args.oldPassword);
    Validator.isValidPassword(newPassword);

    // Part 2: Retrieve the user
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User does not exist");

    // Part 3: Compare the old password
    const isSame = await compare(oldPassword, user.password);
    if (!isSame) throw new Error("The old password is incorrect");

    // Part 4: Update the user
    const hashedPassword = await hash(newPassword, 10);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    // Part 5: Prepare and return the user
    return prepareUserByObject(updatedUser);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Updates the contact information of an existing user, given the relevant input.
 *
 * @async
 * @function
 * @param {Object} args - The input arguments containing the new contact information.
 * @param {string} args.newContact - The new contact information to be set for the user.
 * @param {Object} context - The context object containing information about the request & response.
 *
 * @returns {Promise<Object>} A promise that resolves to the prepared updated user object.
 *
 * @throws {Error} If the client is not authenticated, or if the new contact information is invalid.
 */
const changeContact = async (args, context) => {
  try {
    // Ensure the client is authenticated
    const userId = await Validator.isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitation & Validation of the input
    const newContact = Validator.sanitizeContent(args.newContact);
    Validator.isValidContact(newContact);

    // Part 2: Update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { contact: newContact },
      { new: true }
    );

    // Part 3: Prepare and return the user
    return prepareUserByObject(updatedUser);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/* User-related resolvers. */
export default {
  getUserProfile,
  signIn,
  signOut,
  signUp,
  changeEmail,
  changePassword,
  changeContact,
};
