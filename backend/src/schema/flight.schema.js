/**
 * GraphQL schema definition for Flight type.
 *
 * @typedef {string} FlightSchema
 * @description Represents the GraphQL schema for the Flight type.
 */
export const FlightSchema = `
  type Flight {
    _id: String!
    price: Int!
    daysUntilFlight: Int!
    departTime: String!
    departLoc: String!
    arrTime: String!
    arrLoc: String!
    seatsLeft: Int!
    intraProvince: Boolean!
  }
`;

/**
 * GraphQL queries related to the Flight type.
 *
 * @typedef {string} FlightQueries
 * @description Represents the GraphQL queries for interacting with the Flight type.
 */
export const FlightQueries = `
  getFlights : [Flight]
  getFlightById(_id: String!) : Flight
`;

/**
 * GraphQL mutations related to the Flight type.
 *
 * @typedef {string} FlightMutations
 * @description Represents the GraphQL mutations for interacting with the Flight type.
 */
export const FlightMutations = `
`;
