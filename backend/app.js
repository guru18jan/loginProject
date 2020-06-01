const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const cors = require('cors');
//require config file
const config = require('./helper/config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressValidator());

app.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Helmet
var helmet = require('helmet')

module.exports.secure = function(app) {
    var policy = {
      'default-src': [
          "'self'",
          "data:",
          "'unsafe-inline'",
          "'unsafe-eval'"
      ],
      'img-src': [
          "'self'",
          "data:",
          "www.google-analytics.com"
      ],
      'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "www.google-analytics.com"
      ]
    }

    app.use(helmet.csp(policy))

    // Stop Clickjacking with one simple header
    // but allow it for responsinator only
    helmet.xframe('allow-from', 'http://localhost')

    app.use(helmet.nosniff())
    app.use(helmet.xssFilter())
    app.use(helmet.hidePoweredBy())

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })
    app.use(expressValidator());

}

// Connect to Database
mongoose.Promise = global.Promise;
var url = config.mongoUrl;
mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
}).then(() => {
  console.log("Successfully connected to the database " + url);
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use(cors());

app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header('Access-Control-Allow-Credentials', true);
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken");
       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
       res.setHeader('Access-Control-Expose-Headers','jwtToken')
       next();
   })
   
app.listen(config.port,() => console.log('App listening on port '+config.port));

module.exports = app;
