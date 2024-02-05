import { isValidObjectId } from "mongoose";
import FlightModel from "../models/flight.model.js";
import TicketModel from "../models/ticket.model.js";
import UserModel from "../models/user.model.js";
import { prepareTicketByObject } from "../utils/prepareInfo.js";
import { isAuthenticated, sanitizeContent } from "../utils/validateInput.js";

/**
 * Retrieves a ticket specified by its ID.
 *
 * @param {Object} args - The input arguments containing the ticket ID.
 * @param {string} args.ticketId - The ID of the ticket to retrieve.
 * @param {Object} context - The context object containing the user's ID and token.
 *
 * @returns {Promise<Ticket>} A promise that resolves to a ticket object.
 *
 * @throws {Error} If the ticket ID is invalid, the ticket is not found, the ticket does not belong
 * to the user, or an error occurs during the retrieval.
 */
const getTicketById = async function (args, context) {
  try {
    // Ensure the client is authenticated
    const userId = await isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitation & Validation of the input
    const ticketId = sanitizeContent(args.ticketId);
    if (!isValidObjectId(ticketId)) throw new Error(`Invalid ticket id ${ticketId} provided.`);

    // Part 2: Search for the ticket with the specified ID
    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found.");

    // Part 3: Ensure the ticket belongs to the user
    if (ticket.owner.toString() !== userId) throw new Error("Ticket does not belong to the user.");

    // Part 4: Prepare the ticket and return it
    return prepareTicketByObject(ticket);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/**
 * Purchases a flight ticket for the authenticated user.
 *
 * @param {Object} args - The input arguments containing the flight ID.
 * @param {string} args.flightId - The ID of the flight for which to purchase a ticket.
 * @param {Object} context - The context object containing the user's ID and token.
 *
 * @returns {Promise<Ticket>} A promise that resolves to the purchased ticket object.
 *
 * @throws {Error} If the flight ID is invalid, the flight is not found, the user does not exist,
 * the flight is not in the user's cart, there are no seats available for the flight, an error
 * occurs during the ticket creation, or an error occurs during a document update.
 */
const purchaseTicket = async function (args, context) {
  try {
    // Ensure the client is authenticated
    const userId = await isAuthenticated(context.req.id, context.req.token);

    // Part 1: Sanitation & Validation of the input
    const flightId = sanitizeContent(args.flightId);
    if (!isValidObjectId(flightId)) throw new Error(`Invalid flight id ${flightId} provided.`);

    // Part 2: Search for the flight with the specified ID
    const flight = await FlightModel.findById(flightId);
    if (!flight) throw new Error("Flight not found.");

    // Part 3: Retrieve the user
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User does not exist.");

    // Part 4: Ensure the flight is in the user's cart
    const index = user.cart.findIndex(
      (traversalFlightId) => traversalFlightId.toString() == flightId
    );
    if (index === -1) throw new Error("Flight not found in the cart.");

    // Part 5: Ensure there are seats available for the flight and update the flight
    if (flight.seatsLeft === 0) throw new Error("No seats available for the flight.");
    else {
      flight.seatsLeft -= 1;
      await flight.save();
    }

    // Part 6: Create a new ticket
    const newTicket = await TicketModel.create({
      flight: flight._id,
      totalPrice: flight.price,
      purchaseDate: new Date(),
      owner: userId,
    });

    // Part 5: Update the user
    user.cart.splice(index, 1);
    user.purchases.push(newTicket._id);
    await user.save();

    // Part 6: Prepare the ticket and return it
    return prepareTicketByObject(newTicket);
  } catch (err) {
    throw err; // Throw error for graphql to handle
  }
};

/* Ticket-related resolvers. */
export default {
  getTicketById,
  purchaseTicket,
};
