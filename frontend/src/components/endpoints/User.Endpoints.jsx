import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as UserAPI from "../../network/user.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetUserProfile component. */
export function GetUserProfile() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves the user object of the authenticated client, providing information \
    about the currently logged-in user. Note that you must be authenticated to successfully access \
    this endpoint.";

  /** Function to handle submission. */
  async function apiFunction() {
    return await UserAPI.getUserProfile();
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={[]} apiFunction={apiFunction} />;
}

/** SignUp component. */
export function SignUp() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint creates a new user based on the provided inputs, including email, password, \
    name, and contact information. The password must meet the following criteria: at least 8 \
    characters, at least one uppercase letter, at least one number, and at least one symbol. \
    Upon successful creation, it returns the newly created user object along with an \
    authentication token for subsequent authenticated requests.";

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
    return await UserAPI.signUp(email, password, name, contact);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** SignIn component. */
export function SignIn() {
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
    return await UserAPI.signIn(email, password);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** SignOut component. */
export function SignOut() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint signs the authenticated client out from their account by deleting the \
    authentication token associated with their session and clearing it from the response cookies. \
    Note that you must be authenticated to successfully access this endpoint.";

  /** Function to handle submission. */
  async function apiFunction() {
    return await UserAPI.signOut();
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={[]} apiFunction={apiFunction} />;
}

/** ChangeEmail component. */
export function ChangeEmail() {
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
    return await UserAPI.changeEmail(newEmail);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** ChangePassword component. */
export function ChangePassword() {
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
    return await UserAPI.changePassword(oldPassword, newPassword);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** ChangeContact component. */
export function ChangeContact() {
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
    return await UserAPI.changeContact(newContact);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** ToggleFlightInCart component. */
export function ToggleFlightInCart() {
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
    return await UserAPI.toggleFlightInCart(flightId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}
