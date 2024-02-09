import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlightsByDate } from "../../network/flight.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetFlightsByDate component. */
function GetFlightsByDate() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves a list of flights based on the departure date, allowing users to find \
    flights departing on a specific day.";

  /* Depart city state. */
  const [date, setDate] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="date-input"
      label="Departure Date"
      placeholder="MM-DD-YYYY"
      variant="outlined"
      onChange={(event) => {
        setDate(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await getFlightsByDate(date);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default GetFlightsByDate;
