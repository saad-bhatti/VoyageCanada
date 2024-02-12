# VoyageCanada

## Team and Contributions

This project was originally developed by Haowen Chang, Saad Mohy Uddin Bhatti, and Awais Aziz at the University of Toronto but since then has been completely redone by Saad Mohy Uddin Bhatti.

## Tech stack

- React
- GraphQL
- Node.js
- MongoDB Atlas

## About VoyageCanada

Welcome to VoyageCanada, a comprehensive travel platform tailored for exploring the diverse landscapes of Canada over the next month. Our web application is meticulously designed to cater to two distinct categories of travel enthusiasts. Firstly, embark on a journey of discovery through intra-province travel, seamlessly connecting major cities within each province. Whether you're craving the vibrant urban life of Toronto or the scenic beauty of Vancouver, VoyageCanada facilitates your exploration with efficiency and convenience.
<br />
<br />
In addition, experience the vastness of Canada through our inter-provinces travel options, spanning across all ten provinces. Venture from the picturesque landscapes of British Columbia to the historic charm of Quebec, creating unforgettable memories as you traverse the diverse tapestry of this expansive nation. At VoyageCanada, we pride ourselves on providing a user-centric platform that simplifies the complexities of travel planning, making your journey within Canada a seamless and enriching experience.
<br />
<br />
Explore our extensive range of booking options, featuring flights that precisely match your preferences, from departure city to pricing and beyond. Our commitment to excellence ensures that every aspect of your travel is carefully considered, allowing you to focus on the excitement of your upcoming adventure. Join us at VoyageCanada, where professionalism meets passion, and embark on a journey that transcends the ordinary!

## Dependencies

| Frontend Dependency                | Version  | Backend Dependency | Version |
| ---------------------------------- | -------- | ------------------ | ------- |
| @emotion/react                     | ^11.11.3 | bcrypt             | ^5.0.1  |
| @emotion/styled                    | ^11.11.0 | body-parser        | ^1.19.2 |
| @fontsource/roboto                 | ^5.0.8   | cookie-parser      | ^1.4.6  |
| @mui/icons-material                | ^5.15.8  | cors               | ^2.8.5  |
| @mui/material                      | ^5.15.7  | dotenv             | ^16.4.1 |
| react                              | ^18.2.0  | envalid            | ^8.0.0  |
| react-dom                          | ^18.2.0  | express            | ^4.17.3 |
| react-router-dom                   | ^6.22.0  | express-graphql    | ^0.12.0 |
| react-scripts                      | ^5.0.1   | graphql            | ^15.8.0 |
| react-secure-storage               | ^1.3.2   | jsonwebtoken       | ^8.5.1  |
| react-swipeable-views-react-18-fix | ^0.14.1  | mongoose           | ^8.1.1  |
|                                    |          | morgan             | ^1.10.0 |
|                                    |          | nodemon            | ^3.0.3  |
|                                    |          | validator          | ^13.7.0 |

## File Structure

**`backend/`** - Contains the backend server code

- **`src/`** - Contains the source files

  - **`db/`** - Contains the code and data to initialize the database
  - **`models/`** - Contains the models for the database
  - **`resolvers/`** - Contains the resolvers for the graphql server
  - **`schema/`** - Contains the schema for the graphql server
  - **`utils/`** - Contains the utility functions
  - **`app.js`** - Initializes the express application
  - **`server.js`** - Initializes the graphql server

- **`.env`** - Contains the environment variables
- **`Dockerfile`** - Commands for building a docker image
- **`package.json`** - Defines npm behaviors and packages

**`frontend/`** - Contains the frontend server code

- **`public/`** - Contains the public files for the frontend
- **`src/`** - Contains the source files

  - **`components/`** - Contains the code of all components
  - **`images/`** - Contains the images seen throughout the application
  - **`network/`** - Contains the code for communicating with the backend
  - **`pages/`** - Contains the pages accessible in the application
  - **`utils/`** - Contains the utility functions
  - **`App.js`** - Initializes the react frontend application
  - **`index.js`** - Renders the react app by rendering App.js

- **`.env`** - Contains the environment variables
- **`Dockerfile`** - Commands for building a docker image
- **`package.json`** - Defines npm behaviors and packages
- **`webpack.config.js`** - Contains the configuration for webpack

**`docker-compose.yml`** - Contains the docker-compose file for the application

**`README.md`** - This file!
