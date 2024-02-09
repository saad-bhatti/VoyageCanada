import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as FlightAPI from "../../network/flight.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetFlightById component. */
export function GetFlightById() {
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
    return await FlightAPI.getFlightById(flightId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** GetFlights component. */
export function GetFlights() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves a list of flights based on pagination parameters, allowing users to \
    navigate through a large set of flights in smaller, manageable chunks.";

  /* Page number state. */
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="page-num-input"
      label="Page Number"
      type="number"
      value={pageNum}
      variant="outlined"
      onChange={(event) => {
        setPageNum(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="page-size-input"
      label="Page Size"
      type="number"
      value={pageSize}
      variant="outlined"
      onChange={(event) => {
        setPageSize(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await FlightAPI.getFlights(pageNum, pageSize);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** GetFlightsByCity component. */
export function GetFlightsByCity() {
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
    return await FlightAPI.getFlightsByCity(departCity, arriveCity);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** GetFlightsByDate component. */
export function GetFlightsByDate() {
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
    return await FlightAPI.getFlightsByDate(date);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}
