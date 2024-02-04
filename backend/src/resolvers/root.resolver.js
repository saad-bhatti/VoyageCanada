import AddressResolver from "./address.resolver.js";
// import * as CartResolver from "./cart";
import FlightResolver from "./flight.resolver.js";
// import * as HistoryResolver from "./history";
import UserResolver from "./user.resolver.js";

export default {
  ...UserResolver,
  ...AddressResolver,
  ...FlightResolver,
};
