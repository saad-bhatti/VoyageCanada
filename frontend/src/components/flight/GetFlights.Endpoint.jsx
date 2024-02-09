import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlights } from "../../network/flight.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetFlights component. */
function GetFlights() {
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
    return await getFlights(pageNum, pageSize);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default GetFlights;
