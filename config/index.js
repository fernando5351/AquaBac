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
    Jwt:{
        secret: process.env.JWT_SECRET,
        login: process.env.JWT_LOGIN,
        recovery: process.env.JWT_RECOVERY
    },
    Mail:{
        mail: process.env.MAIL_ADDRESS,
        password: process.env.MAIL_PASSWORD
    }
}

module.exports = config;
