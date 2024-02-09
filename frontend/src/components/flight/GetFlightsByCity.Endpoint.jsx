import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlightsByCity } from "../../network/flight.api";
import EndpointForm from "../form/Endpoint.Form";

function GetFlightsByCity() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves a list of flights based on the departure and arrival cities, making it\
    convenient to find flights between specific locations.";

  /* Depart city state. */
  const [departCity, setDepartCity] = useState("");
  /* Arrive city state. */
  const [arriveCity, setarriveCity] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="depart-city-input"
      label="Depart City"
      variant="outlined"
      onChange={(event) => {
        setDepartCity(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="arrive-city-input"
      label="Arrive City"
      variant="outlined"
      onChange={(event) => {
        setarriveCity(event.target.value);
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
      const response = await getFlightsByCity(departCity, arriveCity);
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

export default GetFlightsByCity;
