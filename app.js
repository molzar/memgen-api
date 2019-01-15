const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');


const routes = require('./routes/index');
const apiUsers = require('./routes/users');
const apiPosts = require('./routes/posts');
//const getConfig = require('./configs.js');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));

//TODO : Do better here !
app.use('/', routes);
app.use('/api/users', apiUsers);
app.use('/api/posts', apiPosts);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


const port = process.env.PORT || 3000;
// Send message for default URL

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running on port " + port);
});

module.exports = app;