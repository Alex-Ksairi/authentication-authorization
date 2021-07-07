const express = require('express');
const app = express();
//const cors = require('cors');

const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const port = process.env.DB_PORT;

// configure passport
const initializePassport = require('./passport-config');
initializePassport(passport);

// importing routes
const userRoute = require('./routes/userRoute');
const homeRoute = require('./routes/homeRoute');

// middleware
app.set('view engine', 'ejs');

// used for form data
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// used for json data
// app.use(express.json());
// app.use(cors());

// using routes
app.use('/home', homeRoute);
app.use('/users', userRoute);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
    )
    .then(() => console.log('Connection has been successfully established! Welcome to database...'))
    .catch(() => console.log('Ups, database couldn\'t be connected!'));

app.listen(port, () => console.log('Server is running and being ready for requests...'));