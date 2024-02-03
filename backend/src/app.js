import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import root from "./resolvers/root.resolver.js";
import schema from "./schema/root.schema.js";
import env from "./utils/validateEnv.js";

// Initialize the app
const app = express();

// Add middleware to log HTTP requests
app.use(morgan("dev"));

// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to parse the cookies
app.use(cookieParser());

// Middleware to enable CORS
app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware to attach the token and user id to the request
app.use(function (req, res, next) {
  // Get the token from the cookies
  const token = req.cookies.Authorization;
  if (token) {
    try {
      const validToken = jwt.verify(token, env.SECRET); // Verify the token
      req.token = token; // Attach the token to the request
      req.id = validToken.id; // Attach the user id from the token
    } catch (err) {
      // Invalid token
      console.log(err);
      req.token = "";
      req.id = "";
    }
  }
  // If the token does not exist, intialize field to empty string
  else {
    req.token = "";
    req.id = "";
  }
  next();
});

// Handle the GraphQL requests
app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema: schema,
    rootValue: root,
    context: {
      req: req,
      res: res,
    },
    credentials: true,
    graphiql: true,
  }))
);

export default app;
