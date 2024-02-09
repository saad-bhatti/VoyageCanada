import TextField from "@mui/material/TextField";
import { useState } from "react";
import { changePassword } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** ChangePassword component. */
function ChangePassword() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint updates the password of an existing user with a new password provided in the \
    input arguments. The new password must meet the following criteria: at least 8 characters, \
    at least one uppercase letter, at least one number, and at least one symbol. Note that you \
    must be authenticated to successfully access this endpoint.";

  /* Old password state. */
  const [oldPassword, setOldPassword] = useState("");
  /* New password state. */
  const [newPassword, setNewPassword] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="old-password-input"
      type="password"
      label="Current Password"
      variant="outlined"
      onChange={(event) => {
        setOldPassword(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="new-password-input"
      type="password"
      label="New Password"
      variant="outlined"
      onChange={(event) => {
        setNewPassword(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await changePassword(oldPassword, newPassword);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default ChangePassword;
