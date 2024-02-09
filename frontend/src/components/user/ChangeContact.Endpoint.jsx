import TextField from "@mui/material/TextField";
import { useState } from "react";
import { changeContact } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** ChangeContact component. */
function ChangeContact() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint updates the contact information of an existing user with a new contact \
    provided in the input arguments. The provided contact information must be a valid phone \
    number. Note that you must be authenticated to successfully access this endpoint.";

  /* New contact state. */
  const [newContact, setNewContact] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="new-contact-input"
      type="tel"
      label="New Contact Information"
      variant="outlined"
      onChange={(event) => {
        setNewContact(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await changeContact(newContact);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default ChangeContact;
