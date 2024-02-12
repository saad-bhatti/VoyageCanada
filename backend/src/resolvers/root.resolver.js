import AddressResolver from "./address.resolver.js";
import FlightResolver from "./flight.resolver.js";
import TicketResolver from "./ticket.resolver.js";
import UserResolver from "./user.resolver.js";

export default {
  ...UserResolver,
  ...AddressResolver,
  ...FlightResolver,
  ...TicketResolver,
};
