// Validator
const validator = require("validator");

// Validators
/* Check if the email is valid */
const isEmail = function (email) {
  return validator.isEmail(email);
};

/* Check if password has length is at least 12 characters, contains an uppercase and a lowercase */
const validPassword = function (password) {
  return validator.isStrongPassword(password, {
    minLength: 12,
    minLowerCase: 1,
    minUpperCase: 1,
  });
};

/* Check if the contact info is valid */
const validContact = function (contact) {
  return validator.isMobilePhone(contact);
};

// Sanitizers
/* Replace <, >, &, ', " and / with HTML entities in the content and trim whitespace */
const sanitizeContent = function (inputStr) {
  return validator.trim(validator.escape(inputStr));
};

module.exports = {
  isEmail,
  validPassword,
  validContact,
  sanitizeContent,
};
