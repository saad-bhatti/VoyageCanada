/**
 * GraphQL schema definition for Ticket type.
 *
 * @typedef {string} TicketSchema
 * @description Represents the GraphQL schema for the Ticket type.
 */
export const TicketSchema = `
  type Ticket {
    _id: String!
    flight: Flight!
    totalPrice: Float!
    purchaseDate: String!
    owner: User!
  }
`;

/**
 * GraphQL queries related to the Ticket type.
 *
 * @typedef {string} TicketQueries
 * @description Represents the GraphQL queries for interacting with the Ticket type.
 */
export const TicketQueries = `
  getTicketById(ticketId: String!) : Ticket!
`;

/**
 * GraphQL mutations related to the Ticket type.
 *
 * @typedef {string} TicketMutations
 * @description Represents the GraphQL mutations for interacting with the Ticket type.
 */
export const TicketMutations = `
  purchaseTicket(flightId: String!) : Ticket!
`;