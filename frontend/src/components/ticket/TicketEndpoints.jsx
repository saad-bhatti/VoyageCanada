import CustomTab from "../tab/CustomTab";
import GetTicketById from "./GetTicketById.Endpoint";
import PurchaseTicket from "./PurchaseTicket.Endpoint";

/** TicketEndpoints component. */
function TicketEndpoints() {
  return (
    <CustomTab
      id="TicketEndpoints"
      tabs={["getTicketById", "purchaseTicket"]}
      tabPanels={[<GetTicketById />, <PurchaseTicket />]}
      isVertical={true}
    />
  );
}

export default TicketEndpoints;
