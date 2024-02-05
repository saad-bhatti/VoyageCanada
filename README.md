# VoyageCanada

## Team and Contributions

- **Haowen Chang:** Development of the frontend server including:
  - Implemented every page of the frontend
  - Design of all visual components
  - Development of the frontend API
- **Saad Mohy Uddin Bhatti:** Development of the backend server including:
  - Implementation of Graphql and Node.js
  - Integration of MongoDB Atlas
  - Development of frontend API
- **Awais Aziz:**
  - Deployment of the application
  - Supported development of the frontend

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

## Usage

## Features

## Dependencies

| Frontend Dependency       | Version | Backend Dependency | Version |
| ------------------------- | ------- | ------------------ | ------- |
| @emotion/react            | ^11.8.2 | bcrypt             | ^5.0.1  |
| @emotion/styled           | ^11.8.1 | body-parser        | ^1.19.2 |
| @mui/icons-material       | ^5.5.1  | cors               | ^2.8.5  |
| @mui/material             | ^5.5.1  | express            | ^4.17.3 |
| @mui/utils                | ^5.4.4  | express-graphql    | ^0.12.0 |
| prop-types                | ^15.8.1 | graphql            | ^15.8.0 |
| react                     | ^17.0.2 | jsonwebtoken       | ^8.5.1  |
| react-dom                 | ^17.0.2 | mongoose           | ^6.2.7  |
| react-geocode             | ^0.2.3  | validator          | ^13.7.0 |
| react-icons               | ^4.3.1  |                    |         |
| react-places-autocomplete | ^7.3.0  |                    |         |
| react-router-dom          | ^6.2.2  |                    |         |
| react-scripts             | 5.0.0   |                    |         |

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

  - **`components/`** - Contains the all components
  - **`pages/`** - Contains the pages
  - **`style/`** - Contains the styles
  - **`api.js`** - Contains the API to communicate with the backend
  - **`App.js`** - Initializes the react frontend application
  - **`index.js`** - Renders the react app by rendering App.js

- **`Dockerfile`** - Commands for building a docker image
- **`package.json`** - Defines npm behaviors and packages

**`nginx/`** - Contains the nginx configuration file

- **`default.conf`** - Contains the configuration for the nginx server
- **`Dockerfile`** - Commands for building a docker image for the nginx server

**`docker-compose.yml`** - Contains the docker-compose file for the application

**`README.md`** - This file!
