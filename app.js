require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swaggger.json');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authenicateRouter = require('./routes/authenicate')

var app = express();

var connectDb = require('./configs/db')
var {errorHandler, notFoundHandler} = require('./errorhandle/errorhandle')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
connectDb()

const mid = async (req, res, next) => {
    next()
}

app.use(mid)
app.use('/',  indexRouter);
app.use('/users', usersRouter);
app.use('/authenticate', authenicateRouter);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(process.env.PORT || 3000)


// module.exports = app;
