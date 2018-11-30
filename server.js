const express = require('express'),
    app = express(),

    redisConnector = require('./lib/configs/redis.config'),
    parser = require('body-parser'),
    route = require("./lib/modules/user/routes");
require('dotenv').config(`${__dirname}/.env`),
    dbConnector = require('./lib/helpers/db.helper');

dbConnector.init(app);
redisConnector.init(app);
app.use(function (req, res, next) {
    console.log("Hello");

    console.log('app.locals', app.locals)
    req.dbCon = app.locals.db;
    next();
})
console.log('app => ', app.locals.db);
app.get('/', (req, res, next) => {
    console.log('api reqeusts' + app.locals.db);
    next();
}, function (req, res, next) {
    console.log(
        'req.dbCon', req.dbCon
    )
    res.send("Hello Again")
})

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }))

app.use((req,res,next)=> {
    req.db = app.locals.db;//sending database as request to perform routing methods
    next();
},route);
//app.use('/', route);
//app.listen(8000);

app.listen(8000, () => {
    console.log('Listening to the port on 8000');
})
