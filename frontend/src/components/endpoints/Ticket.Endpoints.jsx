import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getTicketById, purchaseTicket } from "../../network/ticket.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetTicketById component. */
export function GetTicketById() {
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

/** PurchaseTicket component. */
export function PurchaseTicket() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint purchases a ticket for a flight in the authenticated user's cart, specified by \
    its ID. Note that you must be authenticated to successfully access this endpoint.";

  /* Flight id state. */
  const [flightId, setFlightId] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="flight-id-input"
      label="Flight Id"
      variant="outlined"
      onChange={(event) => {
        setFlightId(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await purchaseTicket(flightId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}
