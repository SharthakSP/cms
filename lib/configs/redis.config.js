
//redis connection configuration
((redisConnector) =>{

    'use strict'; 
const redis = require('redis');
const redisClient = redis.createClient({host:'localhost', port:6379});
redisConnector.init = async (app) =>{
   await redisClient.on('ready',function(){
        console.log("Redis Server is ready");
    });
    
    await redisClient.on('error', function(){
        console.log("Error in Reddis Server Connection");
    });
}

})(module.exports);