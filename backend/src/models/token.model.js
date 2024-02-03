import { Schema, model } from "mongoose";

/**
 * JWT Token Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} TokenSchema
 *
 * @property {string} token - The JWT token of the user (unique and required).
 * @property {string} expiresIn - The expiry date of the token (required).
 */
const tokenSchema = new Schema({
  token: { type: String, unique: true, required: true },
  expiresIn: { type: Date, required: true },
});

export default model("Token", tokenSchema);
