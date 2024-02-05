import { Schema, model } from "mongoose";

/**
 * Ticket Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} TicketSchema
 *
 * @property {string} flight - The flight ID of the ticket (required).
 * @property {number} totalPrice - The total price of the ticket (required).
 * @property {Date} purchaseDate - The purchase date of the ticket (required).
 * @property {ObjectId} owner - The user who purchased the ticket.
 */
const ticketSchema = new Schema({
  flight: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  purchaseDate: { type: Date, required: true},
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

export default model("Ticket", ticketSchema);
