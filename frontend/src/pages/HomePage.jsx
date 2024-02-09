import AddressPanel from "../components/panels/Address.Panel";
import CreditsPanel from "../components/panels/Credits.Panel";
import FlightPanel from "../components/panels/Flight.Panel";
import TicketPanel from "../components/panels/Ticket.Panel";
import UserPanel from "../components/panels/User.Panel";
import CustomTab from "../components/tab/CustomTab";

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
        <UserPanel />,
        <AddressPanel />,
        <FlightPanel />,
        <TicketPanel />,
        <CreditsPanel />,
      ]}
      isVertical={false}
    />
  );
}

export default HomePage;
