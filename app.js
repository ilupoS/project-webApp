//Getting values from .env file
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require("passport");

var indexRouter = require('./routes/index');
var loginRouter = require('./api/login');
var registerRouter = require('./api/register');
var postsRouter = require('./api/posts')



//Connecting to mongoDB
const mongoDB = "mongodb://localhost:27017/projectdb"
console.log(mongoDB);
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection had a error"));

var app = express();

//initializing passport
require("./auth/authToken")(passport);
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', loginRouter);
app.use('/api', registerRouter);
app.use('/api/posts', postsRouter);


module.exports = app;
