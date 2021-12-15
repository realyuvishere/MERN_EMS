# Employee Management System (backend)

Employee Managemenet System (EMS) is a software / platform where all official records regarding the work done by an employee, as well as their personal details are stored and managed in a secure way.

This software package is built on the MERN stack, specifically using the following technologies:

- `MongoDB (Mongoose)`: MongoDB is used to store the data as it would be faster to change any structure down the line due to scaling up of the organisation. Mongoose is used as a middleware to connect with MongoDB.
- `Express.js`: Express.js is used for creating the API routes.
- `Swagger`: Swagger UI is used for the API testing and mapping to make sure that all the endpoints are covered and accessible via the user(s).

### How to navigate through the software package

The following points will highlight the purpose of every directory present in this package:

- `/routes`: contains all the sub-routes for the main routes. Example - `/auth` is the main route, `/auth/login` is the sub-route.
- `/models`: contains all the models for the database along with some validation logic.
- `/middleware`: contains all the middleware logic to be used on the routes.
- `/lib`: contains all the miscellaneous scripts for setting up the configurations for database, swagger, etc.
- `/docs`: contains the documentation on API, along with structures for swagger in `.yaml` file format.
- `/controller`: contains all the logic used at a given route.

### How to get started

- Go through `/docs/readme.md` to understand what are the pre-requisites to setup the software.
- Install the packages and run either of the following commands:
    - `npm start`: to start the main app.
    - `npm run dev`: to start development mode using `nodemon`.

