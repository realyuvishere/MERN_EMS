# API Documentation

This document outlines the usage of the Employee Management System API. It contains all the necessary assumptions and variables used to build the API. 

### Assumptions

- This software is built on the primary assumption that this API will be utilised by an organisation internally.
- It accomodates the HR department / managers to login / register as a user and use the features.
- The organisation has already established an admin user who has full control over this software and can manage the registered users, i.e. create new user, block / delete malicious activity / user(s).
- The organisation has multiple departments (atleast 2) whose employees it wants to manage.


### Variables

- `.env` file contains all the environment variables, which are listed below: 
    - The following variable declarations are **required**:
        - `JWT_SECRET`: This variable holds the secret key for JWT (JSON Web Token) encryption for passwords.
        - `MONGODB_URL`: This variable holds the URL for the MongoDB used for the application.
    - The following variable declarations are **optional**:
        - `PORT`: This variable holds the port number at which the app is up and running. The default value is **8080**.
        - `APP_PUBLIC_URL`: This variable holds the URL of the deployed application for using the API. There is no default value for this variable.

### How to use the API

- The API can be accessed using the routes defined at the following route: `/api-docs`. The prefix has to be the origin where the app is deployed (`localhost:$PORT` or `$APP_PUBLIC_URL`).

