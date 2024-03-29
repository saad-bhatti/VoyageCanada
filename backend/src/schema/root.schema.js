import { buildSchema } from "graphql";
import { AddressSchema } from "./address.schema.js";
import { FlightSchema } from "./flight.schema.js";
import MutationSchema from "./mutation.schema.js";
import QuerySchema from "./query.schema.js";
import { TicketSchema } from "./ticket.schema.js";
import { UserSchema } from "./user.schema.js";

/**
 * GraphQL schema definition combining all individual schemas into a single schema.
 *
 * @typedef {string} CombinedSchema
 * @description Combines individual GraphQL schemas into a single schema.
 */
export default buildSchema(`
  ${UserSchema}
  ${AddressSchema}
  ${FlightSchema}
  ${TicketSchema}
  ${QuerySchema}
  ${MutationSchema}
`);
