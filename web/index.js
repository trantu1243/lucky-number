const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const { authRouter, dashboardRouter } = require('./routes');
const { Admin } = require('./models');
require('dotenv').config()

const app = express();
const port = 80;

mongoose.connect('mongodb://admin:admin036203@mongodb-container:27017/lucky_number?authSource=admin').then(() => {
    console.log("Connect to mongodb successfully")
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: 'lucky_number@321314',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/auth', authRouter);
app.use('/', dashboardRouter);
// app.use('/monhoc', monhocRouter);

app.get('/cryptomus_a2c0610a.html', (req, res) => {
    res.render('cryptomus');
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function test(){
  const username = 'admin123';
  const password = 'admin@036203';

  const admin = new Admin({ username, password });
  await admin.save();
}

// test()

// Run the script
// generateDiemData();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;
