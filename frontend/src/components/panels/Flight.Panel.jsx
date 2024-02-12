import * as FlightEndpoints from "../endpoints/Flight.Endpoints";
import CustomTab from "../tab/CustomTab";

/** FlightPanel component. */
function FlightPanel() {
  return (
    <CustomTab
      id="FlightEndpoints"
      tabs={["getFlightById", "getFlights", "getFlightsByCity", "getFlightsByDate"]}
      tabPanels={[
        <FlightEndpoints.GetFlightById />,
        <FlightEndpoints.GetFlights />,
        <FlightEndpoints.GetFlightsByCity />,
        <FlightEndpoints.GetFlightsByDate />,
      ]}
      isVertical={true}
    />
  );
}

export default FlightPanel;
