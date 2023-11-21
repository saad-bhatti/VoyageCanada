# VoyageCanada

## Project Description

An all in one travel website for traveling within Canada for the next month.

Where there are two categories:
- intra-province travel between the major cities in each province and
- inter-provinces travel amongst all the ten provinces in Canada!

What can be booked? Flights that meet all your requirements including on the departure city, the price, and more!

Users that are not signed in
- View all information
- but cannot make any bookings

Users that are signed in:
- View all information
- Make bookings
- Keep track of their shopping cart, addresses, and even their shopping history

One may wonder how they can signin. Users can sign in by:
- registering an account with our secure backend server or
- have the option of signing in using third-party authentication (Google, facebook)

## Development

The app build: (overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used)
- Frontend:
  React

- Backend:
  Express-Graphql with nodejs and express
  Libraries used:
     cors => handles CORS
     jsonwebtoken => authentication purposes
     mongoose => handles connection to external database on MongoDb Cloud

## Deployment

Deployed the code on the Digital Ocean server, installed the software like docker, npm and other related dependices. Added 'A' record with the domain name which we got from Namecheap. Used Cloudfare services to attach the SSL certificate.

## Contributions

Contribution of each team member to the project:

- Haowen (Andy) Chang: Development of the frontend server, including all pages, components, and visual components.
- Saad Mohy Uddin Bhatti: Development of the backend server, including the incorporation of graphql, monoogse, and more. Futhermore, the frontend API was developed by Andy and I.
- Awais Aziz: Deployment of the application, along with supporting development of both the frontend and backend.
