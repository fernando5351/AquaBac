const boom = require('@hapi/boom')
const {Strategy} = require('passport-jwt');
const  authController = require('../../controllers/authController');
const bcrypt = require('bcrypt')

const service = new authController;

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,password,done)=>{
    const user = await service.readByEmail(email);
    if (!user) {
        return done(boom.unauthorized('Email not found'), null)
    }
    const isMatch = await bcrypt.compare(password,user.dataValues.password);
    if (!isMatch) {
        return done(boom.unauthorized('Incorrect password'),null)
    }
    delete user.dataValues.password;
    return done(null,user)
});


module.exports = localStrategy