import { AddressQueries } from "./address.schema.js";
import { FlightQueries } from "./flight.schema.js";
import { TicketQueries } from "./ticket.schema.js";
import { UserQueries } from "./user.schema.js";

/**
 * GraphQL schema definition for Queries.
 *
 * @typedef {string} QuerySchema
 * @description Represents the GraphQL schema for queries.
 */
export default `
    type Query {
        ${UserQueries}
        ${AddressQueries}
        ${FlightQueries}
        ${TicketQueries}
    }
`;
