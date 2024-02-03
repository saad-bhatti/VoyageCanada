import { Schema, model } from "mongoose";

/**
 * User Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} UserSchema
 *
 * @property {string} email - The email address of the user (unique and required).
 * @property {string} password - The password of the user (required).
 * @property {string} name - The name of the user (required).
 * @property {string} contact - The contact information of the user (required).
 * @property {Array<string>} addresses - Array of references to Address objects.
 * @property {Array<string>} cart - Array of references to Flight objects in the user's cart.
 * @property {Array<string>} history - Array of references to Flight objects in the user's history.
 */
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  cart: [{ type: Schema.Types.ObjectId, ref: "Flight" }],
  history: [{ type: Schema.Types.ObjectId, ref: "Flight" }],
});

export default model("User", userSchema);
