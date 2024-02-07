import { flightData, ticketData, userData } from "../utils/responseData.js";
import { sendQuery } from "../utils/sendQuery.js";

/**
 * Sends a request to retrieve the authenticated user's profile information.
 *
 * @returns {Promise<User>} A promise that resolves to the user profile object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getUserProfile() {
  const query = `
    query GetUserProfile {
        getUserProfile {
          ${userData}
        }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to sign up a new user.
 *
 * @param {string} email - The email of the user to sign up.
 * @param {string} password - The password of the user to sign up.
 * @param {string} name - The name of the user to sign up.
 * @param {string} contact - The contact information of the user to sign up.
 *
 * @returns {Promise<User>} A promise that resolves to the newly created user object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function signUp(email, password, name, contact) {
  const query = `
    mutation SignUp {
      signUp(
          email: "${email}"
          password: "${password}"
          name: "${name}"
          contact: "${contact}"
      ) {
          ${userData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to sign in an existing user.
 *
 * @param {string} email - The email of the user to sign in.
 * @param {string} password - The password of the user to sign in.
 *
 * @returns {Promise<User>} A promise that resolves to the signed in user object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function signIn(email, password) {
  const query = `
    mutation SignIn {
      signIn(email: "${email}", password: "${password}") {
        ${userData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to sign out the currently authenticated user.
 *
 * @returns {Promise<string>} A promise that resolves to a message indicating successful sign-out.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function signOut() {
  const query = `
    mutation SignOut {
      signOut
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to changes the email of the currently authenticated user.
 *
 * @param {string} newEmail - The new email for the user.
 *
 * @returns {Promise<User>} A promise that resolves to the updated user object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function changeEmail(newEmail) {
  const query = `
    mutation ChangeEmail {
      changeEmail(newEmail: "${newEmail}") {
        ${userData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to changes the password of the currently authenticated user.
 *
 * @param {string} oldPassword - The old password of the user.
 * @param {string} newPassword - The new password for the user.
 *
 * @returns {Promise<User>} A promise that resolves to the updated user object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function changePassword(oldPassword, newPassword) {
  const query = `
    mutation ChangePassword {
      changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}") {
        ${userData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to changes the contact information of the currently authenticated user.
 *
 * @param {string} newContact - The new contact information for the user.
 *
 * @returns {Promise<User>} A promise that resolves to the updated user object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function changeContact(newContact) {
  const query = `
    mutation ChangeContact {
      changeContact(newContact: "${newContact}") {
        ${userData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to retrieve the flights in the authenticated user's cart.
 *
 * @returns {Promise<Flight[]>} A promise that resolves to the flight objects in the user's cart.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getCart() {
  const query = `
    query GetUserProfile {
      getUserProfile {
        cart {
          ${flightData}
        }
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to toggle a flight specified by its id from the authenticated user's cart.
 *
 * @param {string} flightId - The id of the flight to toggle in the cart.
 *
 * @returns {Promise<Flight>} A promise that resolves to the flight objects in the user's cart.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function toggleFlightInCart(flightId) {
  const query = `
    mutation ToggleFlightInCart {
      toggleFlightInCart(flightId: "${flightId}") {
        cart {
          ${flightData}
        }
      }
    }
  `;
  return await sendQuery(query);
}

export async function getPurchases() {
  const query = `
    query GetUserProfile {
      getUserProfile {
        purchases {
          ${ticketData}
        }
      }
    }
  `;
  return await sendQuery(query);
}
