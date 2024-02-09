import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as AddressAPI from "../../network/address.api";
import EndpointTabPanel from "../tab/EndpointTabPanel";

/** GetAddressById component. */
export function GetAddressById() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint retrieves information about a specific address identified by its unique ID. The \
    authenticated user must be the owner of the address to retrieve it. Note that you must be \
    authenticated to successfully access this endpoint.";

  /* Ticket id state. */
  const [addressId, setAddressId] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="address-id-input"
      label="Address Id"
      variant="outlined"
      onChange={(event) => {
        setAddressId(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await AddressAPI.getAddressById(addressId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** CreateAddress component. */
export function CreateAddress() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint creates a new address based on the provided inputs, including street, city, \
    province, and postal code. Note that you must be authenticated to successfully access this \
    endpoint";

  /* Street state. */
  const [street, setStreet] = useState("");
  /* City state. */
  const [city, setCity] = useState("");
  /* Province state. */
  const [province, setProvince] = useState("");
  /* Postal code state. */
  const [postalCode, setPostalCode] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="street-input"
      label="Street"
      variant="outlined"
      onChange={(event) => {
        setStreet(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="city-input"
      label="City"
      variant="outlined"
      onChange={(event) => {
        setCity(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="province-input"
      label="Province"
      placeholder="e.g. ON, BC, QC, etc."
      variant="outlined"
      onChange={(event) => {
        setProvince(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="postal-code-input"
      label="Postal Code"
      variant="outlined"
      onChange={(event) => {
        setPostalCode(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await AddressAPI.createAddress(street, city, province, postalCode);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** UpdateAddress component. */
export function UpdateAddress() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint updates an address specified by its unique ID. The authenticated user must be \
    the owner of the address to update it. Note that you must be authenticated to successfully \
    access this endpoint.";

  /* Address id state. */
  const [addressId, setAddressId] = useState("");
  /* New street state. */
  const [newStreet, setNewStreet] = useState("");
  /* City street state. */
  const [newCity, setNewCity] = useState("");
  /* Province state. */
  const [newProvince, setNewProvince] = useState("");
  /* Postal code state. */
  const [newPostalCode, setNewPostalCode] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="address-id-input"
      label="Address Id"
      variant="outlined"
      onChange={(event) => {
        setAddressId(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="street-input"
      label="Street"
      variant="outlined"
      onChange={(event) => {
        setNewStreet(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="city-input"
      label="City"
      variant="outlined"
      onChange={(event) => {
        setNewCity(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="province-input"
      label="Province"
      placeholder="e.g. ON, BC, QC, etc."
      variant="outlined"
      onChange={(event) => {
        setNewProvince(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
    <TextField
      id="postal-code-input"
      label="Postal Code"
      variant="outlined"
      onChange={(event) => {
        setNewPostalCode(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await AddressAPI.updateAddress(
      addressId,
      newStreet,
      newCity,
      newProvince,
      newPostalCode
    );
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}

/** DeleteAddress component. */
export function DeleteAddress() {
  /* About query section description. */
  const aboutQuery =
    "This endpoint deletes an address specified by its unique ID. The authenticated user must be \
    the owner of the address to delete it. Note that you must be authenticated to successfully \
    access this endpoint.";

  /* Ticket id state. */
  const [addressId, setAddressId] = useState("");

  /* Inputs for the query. */
  const inputs = [
    <TextField
      id="address-id-input"
      label="Address Id"
      variant="outlined"
      onChange={(event) => {
        setAddressId(event.target.value);
      }}
      sx={{ mr: 2 }}
      required
    />,
  ];

  /** Function to handle submission. */
  async function apiFunction() {
    return await AddressAPI.deleteAddress(addressId);
  }

  return <EndpointTabPanel aboutQuery={aboutQuery} inputs={inputs} apiFunction={apiFunction} />;
}
