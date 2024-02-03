/* Local Storage */
if (!localStorage.getItem("auth")) {
    localStorage.setItem("Auth", JSON.stringify(""));
}
if (!localStorage.getItem("clientId")) {
    localStorage.setItem("ClientId", JSON.stringify(""));
}

// Send request to the server given the data
// Code snippet taken from: https://ccoenraets.github.io/es6-tutorial-data/promisify/
function send(body, headers) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        // When response is received
        xhr.onload = function () {
            let resText = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) reject("[" + xhr.status + "]" + resText);
            else if (resText.errors) reject(resText.errors[0].message);
            else {
                // Save the clientId & token if response changes the token
                // Code snippet taken from https://bobbyhadz.com/blog/javascript-check-if-string-contains-substring-from-array
                let sentMethod = xhr.responseText.toString();
                let checkMethod = ["createUser", "signin", "signout"];
                let isChanged = checkMethod.some((element) => {
                    if (sentMethod.includes(element)) {
                        return true;
                    }
                    return false;
                });
                if (isChanged) {
                    localStorage.setItem("Auth", JSON.stringify(xhr.getResponseHeader("Authentication")));
                    localStorage.setItem("ClientId", JSON.stringify(xhr.getResponseHeader("ClientId")));
                }
                resolve(resText);
            }
        };
        // Set up the request
        xhr.open("POST", "/api/graphql", true);
        if (headers) {
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }
        // Add header for authentication of client
        xhr.setRequestHeader("Authentication", JSON.parse(localStorage.getItem("Auth")));
        // Send the request
        xhr.send(JSON.stringify(body));
    });
}

///////////////////////////// User-Related /////////////////////////////
/* Return a boolean if the client is authenticated */
const isAuthenticated = function () {
    return JSON.parse(localStorage.getItem("ClientId")) !== "";
};

/* Register a user to the server */
// Note: Validation of input will be done on backend
const signup = function (email, password, name, contact) {
    // Prepare the request
    const body = {
        query: `
         mutation {
            createUser(userInput: {email: "${email}", password: "${password}", name: "${name}", contact: "${contact}"}) {
              _id,
              email,
              name,
              contact
            }
         }
        `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Sign the client into an account on the server */
// Note: Validation of input will be done on backend
const signin = function (email, password) {
    // Prepare the request
    const body = {
        query: `
         query {
            signin(email: "${email}", password: "${password}") {
              _id,
              email,
              name,
              contact,
              addresses {
                _id,
                street,
                city,
                postalCode,
                province
              }
            }
          }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Get the user profile of the client */
const getUserProfile = function () {
    // Prepare the request
    const body = {
        query: `
         query {
            getUserProfile {
              _id,
              email,
              name,
              contact,
              addresses {
                _id,
                street,
                city,
                postalCode,
                province
              }
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

// Sign the client out of an account
const signout = function () {
    // Prepare the request
    const body = {
        query: `
         query {
            signout
         }
       `,
    };
    const headers = {"Content-Type": "application/json"};
    // Send the request
    send(body, headers)
        .then((data) => {
            return data; // Handle the data
        })
        .catch((err) => {
        });
};

/* Change the email of the client's account */
// Note: Validation of input will be done on backend
const changeEmail = function (newEmail) {
    // Prepare the request
    const body = {
        query: `
         mutation {
            changeEmail(newEmail: "${newEmail}") {
              _id,
              email,
              name,
              contact,
              addresses {
                _id,
                street,
                city,
                postalCode,
                province
              }
            }
          }
       `,
    };
    const headers = {"Content-Type": "application/json"};
    // Send the request
    send(body, headers)
        .then((data) => {
            return data; // Handle the data
        })
        .catch((err) => {
            console.log(err); // Handle the error
        });
};

/* Change the password of the client's account */
// Note: Validation of input will be done on backend
const changePassword = function (oldPassword, newPassword) {
    // Prepare the request
    const body = {
        query: `
         mutation {
            changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}") {
              _id,
              email,
              name,
              contact,
              addresses {
                _id,
                street,
                city,
                postalCode,
                province
              }
            }
          }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Change the contact information of the client's account */
// Note: Validation of input will be done on backend
const changeContact = function (newContact) {
    // Prepare the request
    const body = {
        query: `
         mutation {
            changeContact(newContact: "${newContact}") {
              _id,
              email,
              name,
              contact,
              addresses {
                _id,
                street,
                city,
                postalCode,
                province
              }
            }
          }
       `,
    };
    const headers = {"Content-Type": "application/json"};
    // Send the request
    send(body, headers)
        .then((data) => {
            return data; // Handle the data
        })
        .catch((err) => {
            console.log(err); // Handle the error
        });
};

///////////////////////////// Address-Related /////////////////////////////
/* Add an address to the server */
// Note: Validation of input will be done on backend
const createAddress = function (street, city, province, postalCode) {
  // Prepare the request
  const body = {
    query: `
         mutation {
            createAddress(addressInput: {street: "${street}", city: "${city}", province: "${province}", postalCode: "${postalCode}"}) {
              _id,
              street,
              city,
              province,
              postalCode,
              owner {
                _id,
                email,
                name,
                contact
              }
            }
         }
        `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Get an address specified by its id */
const getAddressById = function (id) {
    // Prepare the request
    const body = {
        query: `
         query {
            getAddressById(_id: "${id}") {
              _id,
              street,
              city,
              province,
              postalCode,
              owner {
                _id,
                email,
                name,
                contact
              }
            }
         }
        `,
    };
    const headers = {"Content-Type": "application/json"};
    // Send the request
    send(body, headers)
        .then((data) => {
            return data; // Handle the data
        })
        .catch((err) => {
            console.log(err); // Handle the error
        });
};

///////////////////////////// Flight-Related /////////////////////////////
// Get all the flights in the database
const getFlights = function () {
    // Prepare the request
    const body = {
        query: `
         query {
            getFlights {
              _id,
              price,
              daysUntilFlight,
              departTime,
              departLoc,
              arrTime,
              arrLoc,
              seatsLeft,
              intraProvince
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

///////////////////////////// Cart-Related /////////////////////////////
/* Get the flights in the client's cart */
const getCart = function () {
  // Prepare the request
  const body = {
    query: `
         query {
            getCart {
              _id,
              price,
              daysUntilFlight,
              departTime,
              departLoc,
              arrTime,
              arrLoc,
              seatsLeft,
              intraProvince
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Add a flight to the client's cart */
const addToCart = function (flightId) {
  // Prepare the request
  const body = {
    query: `
         mutation {
            addToCart(flightId: "${flightId}") {
              _id,
              price,
              daysUntilFlight,
              departTime,
              departLoc,
              arrTime,
              arrLoc,
              seatsLeft,
              intraProvince
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Remove a flight from the client's cart */
const removeFromCart = function (flightId) {
  // Prepare the request
  const body = {
    query: `
         mutation {
            removeFromCart(flightId: "${flightId}") {
              _id,
              price,
              daysUntilFlight,
              departTime,
              departLoc,
              arrTime,
              arrLoc,
              seatsLeft,
              intraProvince
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Move all flights in the client's cart to the client's history */
const completeOrder = function () {
  // Prepare the request
  const body = {
    query: `
         mutation {
            completeOrder {
              _id,
              price,
              daysUntilFlight,
              departTime,
              departLoc,
              arrTime,
              arrLoc,
              seatsLeft,
              intraProvince
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

///////////////////////////// History-Related /////////////////////////////
/* Get the flights in the client's history */
const getHistory = function () {
  // Prepare the request
  const body = {
    query: `
         query {
            getHistory {
              _id,
              price,
              daysUntilFlight,
              departTime,
              departLoc,
              arrTime,
              arrLoc,
              seatsLeft,
              intraProvince
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

/* Remove a flight from the client's history */
const removeFromHistory = function (flightId) {
  // Prepare the request
  const body = {
    query: `
         mutation {
            removeFromHistory(flightId: "${flightId}") {
              _id,
              price,
              daysUntilFlight,
              departTime,
              departLoc,
              arrTime,
              arrLoc,
              seatsLeft,
              intraProvince
            }
         }
       `,
  };
  const headers = { "Content-Type": "application/json" };
  // Send the request
  return send(body, headers);
};

module.exports = {
  // User-related
  isAuthenticated,
  signup,
  signin,
  getUserProfile,
  signout,
  changeEmail,
  changePassword,
  changeContact,
  // Address-related
  createAddress,
  getAddressById,
  // Flight-related
  getFlights,
  // Cart-related
  getCart,
  addToCart,
  removeFromCart,
  completeOrder,
  // History-related
  getHistory,
  removeFromHistory,
};
