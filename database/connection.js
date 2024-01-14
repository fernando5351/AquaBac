const { isProduction, database } = require('../config');

let URI = '';
if (isProduction) {
    URI = database.url;
} else {
    const USER = encodeURIComponent(database.user);
    const PASSWORD = encodeURIComponent(database.password);
    URI = `postgres://${USER}:${PASSWORD}@${database.host}:${database.port}/${database.dbName}`;
}

console.log('URL de la base de datos:', URI);

module.exports = {
    development: {
        url: URI,
        dialect: 'postgres',
    },
    production: {
        url: URI,
        dialect: 'postgres',
    }
};
