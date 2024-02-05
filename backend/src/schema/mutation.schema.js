import { AddressMutations } from "./address.schema.js";
import { FlightMutations } from "./flight.schema.js";
import { TicketMutations } from "./ticket.schema.js";
import { UserMutations } from "./user.schema.js";

/**
 * GraphQL schema definition for Mutations.
 *
 * @typedef {string} MutationSchema
 * @description Represents the GraphQL schema for mutations.
 */
export default `
    type Mutation {
        ${UserMutations}
        ${AddressMutations}
        ${FlightMutations}
        ${TicketMutations}
    }
`;
