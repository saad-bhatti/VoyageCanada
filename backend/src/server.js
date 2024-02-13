import "dotenv/config";
import pg from "pg";
import app from "./app.js";
import env from "./utils/validateEnv.js";

// Create client for PostgreSQL database
const client = new pg.Client({
  user: "root",
  host: "database",
  database: "voyage_canada",
  password: "password",
  port: 5432,
});

// Connect to the PostgreSQL database
let retries = 5;
while (retries) {
  try {
    // Connect to the PostgreSQL database
    await client.connect();
    console.log("Connected to PostgreSQL database");

    // Start the server
    await app.listen(env.PORT);
    console.log(`Server is running on port ${env.PORT}`);

    break;
  } catch (err) {
    // Output necessary information to the console
    retries -= 1;
    console.error("Connection error", err);
    console.log(`Retries left: ${retries}`);

    // Wait for 5 seconds before trying to connect again
    await new Promise((res) => setTimeout(res, 5000));
  }
}
