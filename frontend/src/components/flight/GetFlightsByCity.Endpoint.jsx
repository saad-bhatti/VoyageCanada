import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlightsByCity } from "../../network/flight.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetFlightsByCity component. */
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

  /** Function to handle submission. */
  async function apiFunction() {
    return await getFlightsByCity(departCity, arriveCity);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default GetFlightsByCity;
