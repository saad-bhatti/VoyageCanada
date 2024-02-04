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
    seatsLeft: Int!
    departLocation: String!
    arriveLocation: String!
    intraProvince: Boolean!
    departTime: String!
    arrivalTime: String!
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
  
  getFlightsByLocation(location: String!) : [Flight!]!
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
