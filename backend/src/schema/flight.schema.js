/**
 * GraphQL schema definition for Flight type.
 *
 * @typedef {string} FlightSchema
 * @description Represents the GraphQL schema for the Flight type.
 */
export const FlightSchema = `
  type Flight {
    _id: String!
    airline: String!
    flightNum: String!
    departCity: String!
    arriveCity: String!
    departDate: String!
    arriveDate: String!
    price: Float!
    seatsLeft: Int!
  }
`;

/**
 * GraphQL queries related to the Flight type.
 *
 * @typedef {string} FlightQueries
 * @description Represents the GraphQL queries for interacting with the Flight type.
 */
export const FlightQueries = `
  getFlights(pageNum: Int!, pageSize: Int!) : [Flight!]!
  getFlightById(flightId: String!) : Flight!
  
  getFlightsByCity(departCity: String!, arriveCity: String!) : [Flight!]!
  getFlightsByDate(date: String!) : [Flight!]!
`;

/**
 * GraphQL mutations related to the Flight type.
 *
 * @typedef {string} FlightMutations
 * @description Represents the GraphQL mutations for interacting with the Flight type.
 */
export const FlightMutations = `
`;
