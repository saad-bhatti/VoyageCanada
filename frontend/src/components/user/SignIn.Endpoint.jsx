import TextField from "@mui/material/TextField";
import { useState } from "react";
import { signIn } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** SignIn component. */
function SignIn() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint performs user authentication by verifying the provided email and password, and \
    upon successful authentication, it returns the user object along with a token for subsequent \
    authenticated requests.";

  /* Email state. */
  const [email, setEmail] = useState("");
  /* Password state. */
  const [password, setPassword] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="email-input"
      type="email"
      label="Email"
      variant="outlined"
      onChange={(event) => {
        setEmail(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="password-input"
      type="password"
      label="Password"
      variant="outlined"
      onChange={(event) => {
        setPassword(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await signIn(email, password);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default SignIn;
