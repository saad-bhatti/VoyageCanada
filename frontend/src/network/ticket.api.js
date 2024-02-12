import { ticketData } from "../utils/responseData.js";
import { sendQuery } from "../utils/sendQuery.js";

/**
 * Sends a request to retrieve a ticket by its ID.
 *
 * @param {string} ticketId - The ID of the ticket to retrieve.
 *
 * @returns {Promise<Ticket>} A promise that resolves to the ticket object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getTicketById(ticketId) {
  const query = `
    query GetTicketById {
      getTicketById(ticketId: "${ticketId}") {
        ${ticketData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to purchase a flight ticket for the authenticated user.
 *
 * @param {string} flightId - The ID of the flight to purchase a ticket for.
 *
 * @returns {Promise<Ticket>} A promise that resolves to the purchased ticket object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function purchaseTicket(flightId) {
  const query = `
    mutation PurchaseTicket {
      purchaseTicket(flightId: "${flightId}") {
        ${ticketData}
      }
    }
  `;
  return await sendQuery(query);
}
