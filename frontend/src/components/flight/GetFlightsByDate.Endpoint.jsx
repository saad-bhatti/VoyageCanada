import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlightsByDate } from "../../network/flight.api";
import EndpointForm from "../form/Endpoint.Form";

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

  /* Query response state. */
  const [queryResponse, setQueryResponse] = useState({ text: "", isError: false });

  /** Function to handle submission. */
  async function handleSubmit() {
    try {
      const response = await getFlightsByDate(date);
      setQueryResponse({ text: JSON.stringify(response, null, 2), isError: false });
    } catch (error) {
      setQueryResponse({ text: error.message, isError: true });
    }
  }

  return (
    <EndpointForm
      aboutQuery={aboutQuery}
      inputs={inputs}
      queryResponse={queryResponse}
      handleSubmit={handleSubmit}
    />
  );
}

export default GetFlightsByDate;
