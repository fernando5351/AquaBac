const { database, isProduction } = require('../config/index');
const config = require('../config/index');
const { setUpModels } = require('../database/models');
const { Sequelize } = require('sequelize');

let URI = '';
if (isProduction) {
    URI = database.url; // Corregido para acceder correctamente a la URL en modo de producción
} else {
    const PASSWORD = encodeURIComponent(database.password);
    const USER = encodeURIComponent(database.user);
    URI = `postgres://${USER}:${PASSWORD}@${database.host}:${database.port}/${database.dbName}`;
}
console.log(URI);

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: config.isProduction ? false : console.log
});

setUpModels(sequelize);

module.exports = sequelize;
