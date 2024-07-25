Overview of how this application works
        This Real Estate Management Platform allows users to register, login, and manage property listings. JWT (JSON Web Token) authentication ensures secure access and session management, while bcrypt is used for hashing passwords. The backend, built with Node.js and Express, provides routes for CRUD operations on user and property data. Users can add, view, update, and delete properties. For frontend, with React, includes pages for login, registration, property listing, and dashboard functionality here express, mongoose, jsonwebtoken, bcrypt, and react-router-dom for routing Packages used.



BACKEND code explanation 

# 1.installed required packages 
 npm install bcrypt cookie-parser cors dotenv express jsonwebtoken mongoose morgan nodemon

# 2.initiate the project
 npm init

# 3.Created .env 
 pasted mongo connect url
 PORT number
and created utils/config - to store .env to variable

# 4.created index.js 
    entry point
    import mongoose
    express from app.js
    config to access.env values
    connect to database and listen to port


# 5.created app.js
    to save server related 
    express should to installed 
    import and export express as app

npm run dev to run backend

# 6. Created Models
 user :
 with user credentials
email, password, name, location
 
 property :
with property credentials
property type, location, price, description, status

# 7. created Controllers
 userControllers :
the method for register,login,getUserupdateUser,deleteUser,logoutgetAllUsers,deleteUser is written here and used in userRoutes for user actions

 propertyControllers :
the methods for createProperty,getProperties,searchProperties,getPropertyById,updateProperty,deleteProperty,getAllProperties is written here 

# 8. created routes
 userRoutes :
created routes for users with auth middlewares

 PropertyRoutes :
created routes for all property with auth midlleware 

# 9. in app.js
add all the endpoints and routers with cors to connect with backend





FRONTEND code explanation 

# 1. create react app
 npx create-react-app frontend

# 2.install all required packages
 npm install @mui/material @emotion/react @emotion/styled bootstrap react-bootstrap react-router-dom axios

3.components/
# Navbar.js: 
Contains the navigation bar component used throughout the application includes links to various pages like the dashboard, about page, contact page, and property listings.

4.pages/
This directory contains the different pages of the application. Each page corresponds to a route in the application.
# About.js: 
Provides information about the real estate platform

# Contact.js: 
contact form to reach out to the platform

# Dashboard.js: 
includes links to the about page, contact page, property listings, and add property page.

# Login.js: 
users can enter their email and password to access their account on successful login, users are redirected to the dashboard.

# Register.js: 
new users can sign up by providing their email, password, name, and location after registering, users are redirected to the login page.

# PropertyListing.js: 
all properties available on the platform fetched from backend and lists it for users to view.

# AddProperty.js: 
it allows agents or users to add new property listings includes fields for title, location, price, and description.


5.services/
# userServices.js: 
for interacting with the backend API related to user operations, such as login and registration functions make HTTP requests to the server and handle responses.


6.
# App.js
handles routing using react-router-domroutes for the login, register, dashboard navbar components are mentioned here

7.
# index.js
The entry point of the React application and renders app component





    