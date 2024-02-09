import TextField from "@mui/material/TextField";
import { useState } from "react";
import { toggleFlightInCart } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** ToggleFlightInCart component. */
function ToggleFlightInCart() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint toggles a flight in the user's cart based on the provided flight ID. If the \
    flight is already in the cart, it will be removed. If the flight is not in the cart, it will \
    be added. Note that you must be authenticated to successfully access this endpoint.";

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
    return await toggleFlightInCart(flightId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default ToggleFlightInCart;
