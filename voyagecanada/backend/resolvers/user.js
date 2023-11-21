//////// Imports ////////
// Mongoose
const mongoose = require("mongoose");
// Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Cookies
const cookie = require("cookie");
// JSON Web Token
const jwt = require("jsonwebtoken");
const secret = "5fc7b93edced7400b89f7b3fc070cfebaf80aac6a3d96fea66d409c33e1de7bb";
// Models
const User = require("../models/user");
// Prepare data functions
const { userByObj } = require("./prepare");
// Validator
const validator = require("./validator");

//////// Queries ////////
/* Return the user object of the client */
// NOTE: The client must be authenticated
const getUserProfile = (args, context) => {
  if (!context.req.id) throw new Error("Access denied");
  return User.findById(context.req.id)
    .then((user) => {
      // User does not exist
      if (!user) throw new Error("A user with id " + args._id + "does not exist");
      // Prepare the data to be returned
      return userByObj(user);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Return the user object, given an email & password */
const signinUser = (args, context) => {
  // Sanitize input
  args.email = validator.sanitizeContent(args.email);
  args.password = validator.sanitizeContent(args.password);
  // Search for the user by email
  let userObject;
  return User.findOne({ email: args.email })
    .then((user) => {
      // User does not exist
      if (!user) throw new Error(`User with email '${args.email}' does not exist`);
      // User exists so compare password
      userObject = user;
      return bcrypt.compare(args.password, user.password);
    })
    .then((valid) => {
      // Passwords do not match
      if (!valid) throw new Error("The given password is incorrect");
      // Passwords do match, so create token with user's id
      const token = jwt.sign({ id: userObject.id }, secret, { expiresIn: "2h" });
      // Store information in response headers
      context.res.set({
        Authentication: token,
        ClientId: userObject.id,
      });
      // Prepare the data to be returned
      return userByObj(userObject);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Sign the client out from an account */
// NOTE: The client must be authenticated
const signoutUser = (args, context) => {
  if (!context.req.id) throw new Error("Access denied");
  // Set response headers
  context.res.set({
    Authentication: "",
    ClientId: "",
  });
  // Return message upon success
  return "Successfully signed out";
};

//////// Mutations ////////
/* Create and return a new user, given the relevent inputs */
const createUser = (args, context) => {
  // Sanitation
  args.userInput.email = validator.sanitizeContent(args.userInput.email);
  args.userInput.password = validator.sanitizeContent(args.userInput.password);
  args.userInput.name = validator.sanitizeContent(args.userInput.name);
  args.userInput.contact = validator.sanitizeContent(args.userInput.contact);
  // Validation
  if (
    !(
      validator.isEmail(args.userInput.email) &&
      validator.validPassword(args.userInput.password) &&
      validator.validContact(args.userInput.contact)
    )
  )
    throw new Error("Invalid inputs provided");
  // Search if user with given email already exists. If not, then hash the password
  let searchAndHashProm = User.findOne({ email: args.userInput.email }).then((user) => {
    // If user with the given email already exists
    if (user) throw new Error(`User with email '${args.userInput.email}' already exists`);
    // Otherwise, hash the password
    return bcrypt.hash(args.userInput.password, saltRounds);
  });
  // Create the user object and add the user to the database
  let addUserProm = searchAndHashProm.then((hash) => {
    // Create the new user
    const newUser = new User({
      email: args.userInput.email,
      password: hash,
      name: args.userInput.name,
      contact: args.userInput.contact,
    });
    // Attempt to add the new user to the database
    return newUser.save();
  });
  // Call the promises and return the new user
  return Promise.all([searchAndHashProm, addUserProm])
    .then(([hash, user]) => {
      // Create token with user's id
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: "2h" });
      // Store information in response headers
      context.res.set({
        Authentication: token,
        ClientId: user.id,
      });
      // Prepare the data to be returned
      return userByObj(user);
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Update the email of an existing user, given the relevent input */
// NOTE: The client must be authenticated
const changeEmail = (args, context) => {
  if (!context.req.id) throw new Error("Access denied");
  // Sanitation & Validation
  args.newEmail = validator.sanitizeContent(args.newEmail);
  if (!validator.isEmail(args.newEmail)) throw new Error("Invalid email provided");
  // Search if user with new email already exists
  return User.findOne({ email: args.newEmail })
    .then((doesExist) => {
      // If user with the new email already exists
      if (doesExist) throw new Error(`User with email '${args.newEmail}' already exists`);
      // Otherwise, update the user
      return User.findByIdAndUpdate(context.req.id, { email: args.newEmail }, { new: true });
    })
    .then((updatedUser) => {
      return userByObj(updatedUser); // Prepare the data to be returned
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Update the email of an existing user, given the relevent input */
// Note: The client must be authenticated
const changePassword = (args, context) => {
  if (!context.req.id) throw new Error("Access denied");
  // Sanitation & Validation
  args.newPassword = validator.sanitizeContent(args.newPassword);
  args.oldPassword = validator.sanitizeContent(args.oldPassword);
  if (!validator.validPassword(args.newPassword)) throw new Error("Invalid password provided");
  // Search for the user
  return User.findById(context.req.id)
    .then((user) => {
      // Verify the old password is correct
      return bcrypt.compare(args.oldPassword, user.password);
    })
    .then((valid) => {
      // Passwords do not match
      if (!valid) throw new Error("The old password is incorrect");
      // Otherwise, hash the new password
      return bcrypt.hash(args.newPassword, saltRounds);
    })
    .then((hash) => {
      // Update the password in the database
      return User.findByIdAndUpdate(context.req.id, { password: hash }, { new: true });
    })
    .then((updatedUser) => {
      return userByObj(updatedUser); // Prepare the data to be returned
    })
    .catch((err) => {
      console.log(err);
      throw err; // Throw error for graphql to handle
    });
};

/* Update the contact info of an existing user, given the relevent input */
// NOTE: The client must be authenticated
const changeContact = (args, context) => {
  if (!context.req.id) throw new Error("Access denied");
  // Sanitation & Validation
  args.newContact = validator.sanitizeContent(args.newContact);
  if (!validator.validContact(args.newContact)) throw new Error("Invalid contact provided");
  // Update the user
  return User.findByIdAndUpdate(context.req.id, { contact: args.newContact }, { new: true })
    .then((updatedUser) => {
      return userByObj(updatedUser); // Prepare the data to be returned
    })
    .catch((err) => {
      throw err; // Throw error for graphql to handle
    });
};

/* Export the functions */
module.exports = {
  signinUser,
  getUserProfile,
  signoutUser,

  createUser,
  changeEmail,
  changePassword,
  changeContact,
};
