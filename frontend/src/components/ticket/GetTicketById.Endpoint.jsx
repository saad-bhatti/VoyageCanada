import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getTicketById } from "../../network/ticket.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetTicketById component. */
function GetTicketById() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves information about a specific ticket identified by its unique ID. The \
    authenticated user must be the owner of the ticket to retrieve it. Note that you must be \
    authenticated to successfully access this endpoint.";

  /* Ticket id state. */
  const [ticketId, setTicketId] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="ticket-id-input"
      label="Ticket Id"
      variant="outlined"
      onChange={(event) => {
        setTicketId(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await getTicketById(ticketId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default GetTicketById;
