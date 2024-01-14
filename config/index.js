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
    }
}

<<<<<<< HEAD
console.log("configuracion de la db", config.database);

module.exports = config;
=======
module.exports =  config;
>>>>>>> ef11b29f8f6df41c5bb6f0b830a49cc717e90cd9
