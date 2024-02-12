import { Schema, model } from "mongoose";

/**
 * User Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} UserSchema
 *
 * @property {string} email - The email address of the user (unique and required).
 * @property {string} password - The password of the user (required).
 * @property {string} name - The name of the user (required).
 * @property {string} contact - The contact information of the user.
 * @property {Array<ObjectId>} addresses - Array of references to Address object ids.
 * @property {Array<ObjectId>} cart - Array of references to Flight object ids.
 * @property {Array<ObjectId>} purchases - Array of references to Ticket object ids.
 */
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String },
  addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  cart: [{ type: Schema.Types.ObjectId, ref: "Flight" }],
  purchases: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});

export default model("User", userSchema);
