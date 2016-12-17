/**
 * Created by bo on 12/4/16.
 */
'use strict';

// Bring cloud-env into the app :: 
// cloud-env provides a vendor-neutral interface for autoconfiguring your server,
// allowing it to run on a variety of cloud hosting platforms.
var configCloudEnv = require('cloud-env');

// overwrite default values in configCloudEnv
var port = configCloudEnv.get('PORT', 3000);
var ip = configCloudEnv.get('IP','127.0.0.1');
//var port = configCloudEnv.PORT;
//var ip = configCloudEnv.IP;

// local database
var localDataBase =  '/security_seed_1';
// Build the connection string
var dbURI = configCloudEnv.MONGODB_DB_URL + configCloudEnv.get('APP_NAME', localDataBase);


module.exports = {
    
    db : {
        port : port,
        ip : ip,
        dbURI : dbURI
    },
    jwtConfig : {
        secret: "ChangMeToARealSecretOurIWillBeHacked",
        tokenExpirationTime : 60*20, //seconds
        audience: "yoursite.net",
        issuer: "yourcompany@somewhere.com"
    }
};