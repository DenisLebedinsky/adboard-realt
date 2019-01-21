var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
  logger = require('morgan'),

    bodyParser = require('body-parser'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    houseRouter = require('./routes/house'),
    checkRouter = require('./routes/houseCheck'),
    categoryRouter = require('./routes/category'),
    serviceRouter = require('./routes/service'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    config = require('./config'),
    app = express();

app.use(logger('dev'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

/*app.use(session({
    secret:config.get('session:secret'),
    key:config.get('session:key'),
    resave: true,
    saveUninitialized: true,
    cookie:config.get('session:cookie'),

    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/house', houseRouter);
app.use('/service', serviceRouter);
app.use('/houseCheck', checkRouter);
app.use('/category',categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
