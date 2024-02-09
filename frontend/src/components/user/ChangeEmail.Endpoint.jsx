import TextField from "@mui/material/TextField";
import { useState } from "react";
import { changeEmail } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** ChangeEmail component. */
function ChangeEmail() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint updates the email address of an existing user with a new email provided in the \
    input arguments. The provided email cannot already be in use by another user. Note that you \
    must be authenticated to successfully access this endpoint.";

  /* New email state. */
  const [newEmail, setNewEmail] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="new-email-input"
      type="email"
      label="New Email"
      variant="outlined"
      onChange={(event) => {
        setNewEmail(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await changeEmail(newEmail);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default ChangeEmail;
