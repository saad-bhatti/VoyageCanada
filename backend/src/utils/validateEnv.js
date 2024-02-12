import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators.js";

/**
 * Validates and sanitizes environment variables using the envalid library.
 *
 * @returns {{
 *   DATABASE_URL: string,
 *   FRONTEND_URL: string,
 *   SECRET: string,
 *   PORT: number
 * }} Validated and sanitized environment variables.
 *
 * @throws {Error} If any of the required environment variables are missing or invalid.
 */
export default cleanEnv(process.env, {
  DATABASE_URL: str(),
  FRONTEND_URL: str(),
  SECRET: str(),
  PORT: port(),
});
