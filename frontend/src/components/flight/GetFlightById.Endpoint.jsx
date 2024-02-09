import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlightById } from "../../network/flight.api";
import EndpointForm from "../form/Endpoint.Form";

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

  /* Query response state. */
  const [queryResponse, setQueryResponse] = useState({ text: "", isError: false });

  /** Function to handle submission. */
  async function handleSubmit() {
    try {
      const response = await getFlightById(flightId);
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

export default GetFlightById;
