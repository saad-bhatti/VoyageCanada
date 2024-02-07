import { flightData } from "../utils/responseData.js";
import { sendQuery } from "../utils/sendQuery.js";

/**
 * Sends a request to retrieve a flight by its ID.
 *
 * @param {string} flightId - The ID of the flight to retrieve.
 *
 * @returns {Promise<Flight>} A promise that resolves to the flight object.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getFlightById(flightId) {
  const query = `
    query GetFlightById {
      getFlightById(flightId: "${flightId}") {
        ${flightData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to retrieve the flights on the provided page number, given the page size.
 *
 * @param {number} pageNum - The page number of flights to retrieve.
 * @param {number} pageSize - The number of flights to retrieve per page.
 *
 * @returns {Promise<Flight[]>} A promise that resolves to an array of flight objects.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getFlights(pageNum, pageSize) {
  const query = `
    query GetFlights {
      getFlights(pageNum: ${pageNum}, pageSize: ${pageSize}) {
        ${flightData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to retrieve the flights that depart and arrive in the provided cities.
 *
 * @param {string} departCity - The city of departure.
 * @param {string} arriveCity - The city of arrival.
 *
 * @returns {Promise<Flight[]>} A promise that resolves to an array of flight objects.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getFlightsByCity(departCity, arriveCity) {
  const query = `
    query GetFlightsByCity {
      getFlightsByCity(departCity: "${departCity}", arriveCity: "${arriveCity}") {
        ${flightData}
      }
    }
  `;
  return await sendQuery(query);
}

/**
 * Sends a request to retrieve the flights that depart on the provided date.
 *
 * @param {string} date - The date of departure (MM-DD-YYYY).
 *
 * @returns {Promise<Flight[]>} A promise that resolves to an array of flight objects.
 *
 * @throws {Error} If an error occurs with the request or causes an error in the backend server.
 */
export async function getFlightsByDate(date) {
  const query = `
    query GetFlightsByDate {
      getFlightsByDate(date: "${date}") {
        ${flightData}
      }
    }
  `;
  return await sendQuery(query);
}
