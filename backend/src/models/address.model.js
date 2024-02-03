import { Schema, model } from "mongoose";

/**
 * Address Schema definition for MongoDB.
 *
 * @typedef {import("mongoose").Schema} AddressSchema
 *
 * @property {string} street - The street address (required).
 * @property {string} city - The city of the address (required).
 * @property {string} postalCode
 *  - The postal code of the address
 *  - (required, uppercase, and length of 6).
 * @property {string} province
 *  - The province or territory of the
 *  - address (required, enum with predefined values).
 * @property {string} owner - Reference to the User object owning the address.
 */
const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: {
    type: String,
    required: true,
    uppercase: true,
    minLength: [6, "{VALUE} is an invalid postal code"], // Ensure length of 6
    maxLength: [6, "{VALUE} is an invalid postal code"],
  },
  province: {
    type: String,
    required: true,
    enum: {
      values: ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"],
      message: "{VALUE} is an invalid province or territory",
    },
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Address", addressSchema);
