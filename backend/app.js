// import express
const express = require('express');

// import cors
const cors = require('cors');

// import routers
const userRouter = require('./routes/userRoutes');
const propertyRouter = require('./routes/propertyRoutes');

// import middleware
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// create application
const app = express();

// implementing cors 
app.use(cors({
    origin: '*',  // * allows all origin
    credentials: true
}));

// cookie parser
app.use(cookieParser());
// morgan to log requests to console
app.use(morgan('dev'));

// to enable express application to parse JSON
app.use(express.json());

// define endpoints
app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);

module.exports = app;
