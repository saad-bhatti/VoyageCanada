import { addressData } from "../utils/responseData.js";
import { sendQuery } from "../utils/sendQuery.js";

/**
 * Sends a request to retrieve an address owned by the authenticated user by its ID.
 *
 * @param {string} addressId - The ID of the address to retrieve.
 *
 * @returns {Promise<Address>} A promise that resolves to the address object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getAddressById(addressId) {
  const query = `
    query GetAddressById {
      getAddressById(addressId: "${addressId}") {
        ${addressData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to create a new address for the authenticated user.
 *
 * @param {string} street - The street of the address to create.
 * @param {string} city - The city of the address to create.
 * @param {string} province - The province of the address to create.
 * @param {string} postalCode - The postal code of the address to create.
 *
 * @returns {Promise<Address>} A promise that resolves to the newly created address object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function createAddress(street, city, province, postalCode) {
  const query = `
    mutation CreateAddress {
      createAddress(
          street: "${street}",
          city: "${city}",
          postalCode: "${postalCode}",
          province: "${province}"
      ) {
          ${addressData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to update an address owned by the authenticated user.
 *
 * @param {string} addressId - The ID of the address to update.
 * @param {string} street - The street of the updated address.
 * @param {string} city - The city of the updated address.
 * @param {string} province - The province of the updated address.
 * @param {string} postalCode - The postal code of the updated address.
 *
 * @returns {Promise<Address>} A promise that resolves to the updated address object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function updateAddress(addressId, street, city, province, postalCode) {
  const query = `
    mutation UpdateAddress {
      updateAddress(
          addressId: "${addressId}",
          street: "${street}",
          city: "${city}",
          postalCode: "${postalCode}",
          province: "${province}"
      ) {
          ${addressData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to delete an address owned by the authenticated user.
 *
 * @param {string} addressId - The ID of the address to delete.
 *
 * @returns {Promise<string>} A promise that resolves to a message confirming the deletion.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function deleteAddress(addressId) {
  const query = `
    mutation DeleteAddress {
      deleteAddress(addressId: "${addressId}")
    }
  `;
  return await sendQuery(query);
}
