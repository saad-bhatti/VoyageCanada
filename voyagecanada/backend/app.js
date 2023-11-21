///////////////////////////// Imports /////////////////////////////
// Express
const express = require("express");
const app = express();
// CORS
const cors = require("cors");
// JSON Web Token
const jwt = require("jsonwebtoken");
const secret = "5fc7b93edced7400b89f7b3fc070cfebaf80aac6a3d96fea66d409c33e1de7bb";
// Body-Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// Graphql-Related
const { graphqlHTTP } = require("express-graphql");
// Mongoose
const mongoose = require("mongoose");

///////////////////////////// CORS-Related /////////////////////////////
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authentication", "ClientId"],
    exposedHeaders: ["Authentication, ClientId"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

///////////////////////////// Authentication /////////////////////////////
/* Initialize field in request if valid token is attached to the request */
app.use(function (req, res, next) {
  // Get the token from the headers
  const token = req.get("Authentication");
  // If the token exists, verify the token
  if (token) {
    let validToken;
    try {
      validToken = jwt.verify(token, secret);
      req.id = validToken.id; // Valid token
    } catch (err) {
      // Invalid token
      console.log(err); // Change to response error code 401
      req.id = "";
    }
  }
  // If the token does not exist, intialize field to empty string
  else {
    req.id = "";
  }
  next();
});

///////////////////////////// Graphql - Routing Method /////////////////////////////
/* Schema Defined */
const schema = require("./schema/schema");

/* Resolver Defined */
const root = require("./resolvers/resolver");

/* Routing Defined */
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

///////////////////////////// Database Setup /////////////////////////////
// Database credentials
const DB_USERNAME = "vc_dev";
const DB_PASSWORD = "I<3CSCC09";
const DEF_COLLECTION = "dev";
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@voyagecanada.hrzqf.mongodb.net/${DEF_COLLECTION}?retryWrites=true&w=majority`;
const options = {
  maxPoolSize: 100, // Maintain maximum of 100 socket connections
  minPoolSize: 10, // Maintain minimum of 10 socket connections
  socketTimeoutMS: 60000, // Close socket after 60 seconds of inactivity
  serverSelectionTimeoutMS: 10000, // Try to send operations for 10 seconds
};
// Set up and get default connection
mongoose
  .connect(uri, options)
  .then(() => {
    // Handle errors after initial connection
    mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
  })
  .catch((err) => {
    // Display error to console
    console.log(err);
  });

///////////////////////////// Server Creation /////////////////////////////
const http = require("http");
const PORT = 4000;
http.createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
