// Graphql-Related
const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: String!
    email: String!
    password: String
    name: String!
    contact: String
    addresses: [Address!]
    cart: [Flight]!
    history: [Flight]!
  }

  type Address {
    _id: String!
    street: String!
    city: String!
    postalCode: String!
    province: String!
    owner: User!
  }

  type Flight {
    _id: String!
    price: Int!
    daysUntilFlight: Int!
    departTime: String!
    departLoc: String!
    arrTime: String!
    arrLoc: String!
    seatsLeft: Int!
    intraProvince: Boolean!
  }

  input UserInput {
    email: String!
    password: String!
    name: String!
    contact: String!
  }

  input AddressInput {
    street: String!
    city: String!
    postalCode: String!
    province: String!
  }

  type Query {
    signin(email: String!, password: String!) : User
    getUserProfile : User
    signout : String
    getAddressById(_id: String!) : Address
    getFlights : [Flight]!
    getCart : [Flight]
    getHistory : [Flight]
  }

  type Mutation {
    createUser(userInput: UserInput) : User
    changeEmail(newEmail: String!) : User
    changePassword(oldPassword: String!, newPassword: String!) : User
    changeContact(newContact: String!) : User
    createAddress(addressInput: AddressInput) : Address
    addToCart(flightId: String!) : [Flight]
    removeFromCart(flightId: String!) : [Flight]
    completeOrder : [Flight]
    removeFromHistory(flightId : String!) : [Flight]
  }
`);
