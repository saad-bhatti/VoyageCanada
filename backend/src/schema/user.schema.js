/**
 * GraphQL schema definition for User type.
 *
 * @typedef {string} UserSchema
 * @description Represents the GraphQL schema for the User type.
 */
export const UserSchema = `
  type User {
    _id: String!
    email: String!
    password: String
    name: String!
    contact: String
    addresses: [Address!]
    cart: [Flight]!
    history: [Flight]!
  }
`;

/**
 * GraphQL queries related to the User type.
 *
 * @typedef {string} UserQueries
 * @description Represents the GraphQL queries for interacting with the User type.
 */
export const UserQueries = `
  getUserProfile : User
  
  getCart : [Flight!]!
  getHistory : [Flight!]!
`;

/**
 * GraphQL mutations related to the User type.
 *
 * @typedef {string} UserMutations
 * @description Represents the GraphQL mutations for interacting with the User type.
 */
export const UserMutations = `
  signUp(email: String!, password: String!, name: String!, contact: String!) : User!
  signIn(email: String!, password: String!) : User!
  signOut : String!
  changeEmail(newEmail: String!) : User!
  changePassword(oldPassword: String!, newPassword: String!) : User!
  changeContact(newContact: String!) : User!

  addToCart(flightId: String!) : [Flight!]!
  removeFromCart(flightId: String!) : [Flight!]!
  completeOrder : [Flight!]!
  removeFromHistory(flightId : String!) : [Flight!]!
`;
