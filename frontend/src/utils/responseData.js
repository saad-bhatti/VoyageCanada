/** The fields of user information wanted in the response. */
export const userData = `
  _id
  email
  name
  contact
`;

/** The fields of address information wanted in the response. */
export const addressData = `
  _id
  street
  city
  postalCode
  province
`;

/** The fields of flight information wanted in the response. */
export const flightData = `
  _id
  airline
  flightNum
  departCity
  arriveCity
  departDate
  arriveDate
  price
  seatsLeft
`;

/** The fields of ticket information wanted in the response. */
export const ticketData = `
  _id
  totalPrice
  purchaseDate
  flight {
    ${flightData}
  }
`;