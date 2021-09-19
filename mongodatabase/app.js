const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/index');
const movie = require('./routes/movie');
const books = require('./routes/books')
const {mongo} = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost/movieApi');
mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/movies',movie);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        /*res.render('error', {
            message: err.message,
            error: err
        });*/

        res.json({error: {message: err.message, code: err.code } });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    //res.json({error: {message: err.message, code: err.code } });
});


module.exports = app;
