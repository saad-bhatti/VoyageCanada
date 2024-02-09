import TextField from "@mui/material/TextField";
import { useState } from "react";
import { signUp } from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** SignUp component. */
function SignUp() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint creates a new user based on the provided inputs, including email, password, \
    name, and contact information. The password must meet the following criteria: at least 8 \
    characters, at least one uppercase letter, at least one number, and at least one symbol. Upon \
    successful creation, it returns the newly created user object along with an authentication \
    token for subsequent authenticated requests.";

  /* Email state. */
  const [email, setEmail] = useState("");
  /* Password state. */
  const [password, setPassword] = useState("");
  /* Name state. */
  const [name, setName] = useState("");
  /* Contact state. */
  const [contact, setContact] = useState("");

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
    <TextField
      id="name-input"
      type="text"
      label="Name"
      variant="outlined"
      onChange={(event) => {
        setName(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="contact-input"
      type="tel"
      label="Contact Information"
      variant="outlined"
      onChange={(event) => {
        setContact(event.target.value);
      }}
      sx={{ mr: 2 }}
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await signUp(email, password, name, contact);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

export default SignUp;
