import CustomTab from "../tab/CustomTab";
import GetFlightById from "./GetFlightById.Endpoint";
import GetFlights from "./GetFlights.Endpoint";
import GetFlightsByCity from "./GetFlightsByCity.Endpoint";
import GetFlightsByDate from "./GetFlightsByDate.Endpoint";

function FlightEndpoints() {
  return (
    <CustomTab
      id="FlightEndpoints"
      tabs={["getFlightById", "getFlights", "getFlightsByCity", "getFlightsByDate"]}
      tabPanels={[<GetFlightById />, <GetFlights />, <GetFlightsByCity />, <GetFlightsByDate />]}
      isVertical={true}
    />
  );
}

export default FlightEndpoints;
