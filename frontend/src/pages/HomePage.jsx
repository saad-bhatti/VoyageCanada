import AddressPanel from "../components/panels/Address.Panel";
import CreditsPanel from "../components/panels/Credits.Panel";
import FlightPanel from "../components/panels/Flight.Panel";
import HomePanel from "../components/panels/Home.Panel";
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
        "Home",
        "User Endpoints",
        "Address Endpoints",
        "Flight Endpoints",
        "Ticket Endpoints",
        "Credits",
      ]}
      tabPanels={[
        <HomePanel />,
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
