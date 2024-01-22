const passport = require('passport');
const { jsonwebtoken, loginJwt, recoveryJwt } = require('./strategies/jwt.strategy');
const localStrategy = require('./strategies/local.strategy');

passport.use(localStrategy);
passport.use('jwtLogin', loginJwt);
passport.use('jwtRecovery', recoveryJwt);
passport.use(jsonwebtoken);