import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFlights } from "../../network/flight.api";
import EndpointForm from "../form/Endpoint.Form";

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

  /* Query response state. */
  const [queryResponse, setQueryResponse] = useState({ text: "", isError: false });

  /** Function to handle submission. */
  async function handleSubmit() {
    try {
      const response = await getFlights(pageNum, pageSize);
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

export default GetFlights;
