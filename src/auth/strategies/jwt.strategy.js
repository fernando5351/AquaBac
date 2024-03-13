const {Strategy,ExtractJwt} = require('passport-jwt');
const {Jwt} = require('../../../config/index');

const jwt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Jwt.secret
}

const jsonwebtoken = new Strategy(jwt,async(payload,done)=>{
    if (!payload) {
        return done('no token provided', null)
    }
    return done(null,payload)
});

 const loginOptions = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: Jwt.login
 }

 const loginJwt = new Strategy(loginOptions,(payload,done)=>(null,payload));

 const recoveryOptions = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: Jwt.recovery
 }

 const recoveryJwt = new Strategy(recoveryOptions,(payload,done)=> done(null, payload));

 module.exports = {
    jsonwebtoken,
    loginJwt,
    recoveryJwt
 }