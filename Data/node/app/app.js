var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const con = require('./controllers/connections');
global['settings'] = require('./controllers/setup');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    console.log("本次请求的cid是" + request.cookies.cid);
    let cid = request.cookies.cid;
    if (!cid || parseInt(cid) >= global['settings'].cid) {
        cid = global['settings'].cid++;
        response.cookie('cid', cid, {maxAge: 24*3600*1000});
    }
    con.redis.hset(global['settings'].cid_list_name, cid, 0, (error) => {
        if (error !== null) console.log(error);
    });
    next();
});
app.use('/index', require('./routes/index'));
app.use('/enter', require('./routes/enter'));
app.use('/exit', require('./routes/exit'));
app.use('/ispay', require('./routes/ispay'));

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
