var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bbProductRouter = require('../routes/bb_products');
var bbTaxRouter = require('../routes/bb_tax')
var bbBasketStatusRouter = require('../routes/bb_basketStatus')
var usersRouter = require('../routes/users');
let ejsMate = require('ejs-mate')
let session = require('express-session')
let MongoStore = require('connect-mongo');
let flash = require('connect-flash')
var app = express();
let passport = require('passport')
let userModel = require('../models/user.model');
let methodOverride = require('method-override')
// Session Setup
const store = MongoStore.create({
  mongoUrl: 'mongodb+srv://student1:redvelvet@assignment2-cluster.phqnw7l.mongodb.net/Assignment2?retryWrites=true&w=majority',
})
app.use(methodOverride('_method'));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET || 'this is my unsecured secret',
  cookie: {
    secure: false,
    httpOnly: true
  },
  store: store,
}));

//Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// view engine setup
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//Flash setup
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', bbProductRouter);
app.use('/bb-tax', bbTaxRouter)
app.use('/baskets-status', bbBasketStatusRouter)
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

module.exports = app;
