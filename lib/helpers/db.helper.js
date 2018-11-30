((dbConnector) => {
    'use strict';
    const MongoClient = require('mongodb').MongoClient;
    const dbconfig = require('../configs/app.config');

    dbConnector.init = async (app) => {
        let options = { useNewUrlParser: true };
        MongoClient.connect(dbconfig.url, options).then((client) => {

            const db = client.db('easy-notes');

           

            // const userObj = await db.collection('User').findOne({});
            // console.log('userObj', userObj);

            app.locals.db = db;
            //console.log('connection success....', app.locals.db);
        });
    }
})(module.exports);
