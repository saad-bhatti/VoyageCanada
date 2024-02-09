import Credits from "../components/credits/Credits";
import FlightEndpoints from "../components/flight/FlightEndpoints";
import CustomTab from "../components/tab/CustomTab";
import UserEndpoints from "../components/user/UserEndpoints";

/**
 * HomePage component.
 * @returns {React.ReactNode} HomePage component.
 */
function HomePage() {
  return (
    <CustomTab
      id="HomePage"
      tabs={[
        "VoyageCanada",
        "User Endpoints",
        "Address Endpoints",
        "Flight Endpoints",
        "Ticket Endpoints",
        "Credits",
      ]}
      tabPanels={[
        "VoyageCanada frontend about",
        <UserEndpoints />,
        "Address endpoints",
        <FlightEndpoints />,
        "Ticket endpoints",
        <Credits />,
      ]}
      isVertical={false}
    />
  );
}

export default HomePage;
