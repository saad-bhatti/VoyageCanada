/**
 * GraphQL schema definition for Address type.
 *
 * @typedef {string} AddressSchema
 * @description Represents the GraphQL schema for the Address type.
 */
export const AddressSchema = `
  type Address {
    _id: String!
    street: String!
    city: String!
    postalCode: String!
    province: String!
    owner: User!
  }
`;

/**
 * GraphQL queries related to the Address type.
 *
 * @typedef {string} AddressQueries
 * @description Represents the GraphQL queries for interacting with the Address type.
 */
export const AddressQueries = `
  getAddresses : [Address]!
  getAddressById(_id: String!) : Address
`;

/**
 * GraphQL mutations related to the Address type.
 *
 * @typedef {string} AddressMutations
 * @description Represents the GraphQL mutations for interacting with the Address type.
 */
export const AddressMutations = `
  createAddress(street: String!, city: String!, postalCode: String!, province: String!) : Address
  updateAddress(_id: String!, street: String, city: String, postalCode: String, province: String) : Address
  deleteAddress(_id: String!) : String
`;
