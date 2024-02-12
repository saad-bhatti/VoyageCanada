import CustomTab from "../tab/CustomTab";
import * as TicketEndpoints from "../endpoints/Ticket.Endpoints";

/** TicketPanel component. */
function TicketPanel() {
  return (
    <CustomTab
      id="TicketEndpoints"
      tabs={["getTicketById", "purchaseTicket"]}
      tabPanels={[<TicketEndpoints.GetTicketById />, <TicketEndpoints.PurchaseTicket />]}
      isVertical={true}
    />
  );
}

export default TicketPanel;
