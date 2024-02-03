import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import env from "./utils/validateEnv.js";

// Attempt to connect to MongoDB
mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    // Start the server
    app.listen(env.PORT, () => {
      // Log the server port
      console.log(`Server listening at http://localhost:${env.PORT}`);
    });
  })
  .catch((err) => {
    // Display error to console
    console.log(err);
  });
