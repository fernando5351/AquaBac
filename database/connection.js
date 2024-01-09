const { isProduction, database } = require('../config');

let URI = ""
if (isProduction) {
    URI = database.url;
} else {
    const USER = encodeURI(database.user);
    const PASWORD = encodeURI(database.password);
    URI = `postgres:${USER}:${PASWORD}/${database.host}:${database.port}/${database.dbName}`;
}

module.exports={
    development: {
        url: URI,
        dialect: 'postgres',
    },
    production: {
        url: URI,
        dialect: 'postgres',
    }
} 
