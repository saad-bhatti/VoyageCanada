import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlightById } from "../../network/flight.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetFlightById component. */
function GetFlightById() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves information about a specific flight identified by its unique ID.";

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
    return await getFlightById(flightId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default GetFlightById;
