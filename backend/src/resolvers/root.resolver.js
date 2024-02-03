import AddressResolver from "./address.resolver.js";
// import * as CartResolver from "./cart";
// import * as FlightResolver from "./flight";
// import * as HistoryResolver from "./history";
import UserResolver from "./user.resolver.js";

export default {
  ...UserResolver,
  ...AddressResolver,
};
