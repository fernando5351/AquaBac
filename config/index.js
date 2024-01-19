require('dotenv').config();

const config = {
    isProduction: process.env.NODE_ENV === 'production',
    database: {
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        dbName: process.env.DATABASE_NAME,
        url: process.env.DATABASE_URL
    },
    mail: {
        user: process.env.EMAIL,
        password: process.env.EMAIL_PASSWORD,
        service: process.env.MAIL_SERVICE,
        port: process.env.EMAIL_PORT
    }
}

console.log("configuracion de la db", config.database);

module.exports = config;
