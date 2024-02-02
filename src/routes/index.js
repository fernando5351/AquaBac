const router = require('express').Router();

const roleRouter = require('./role.routes');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');

function routerHandler(app) {
    app.use('/api/v1', router);
    router.use('/role',roleRouter);
    router.use('/user',userRouter);
    router.use('/auth',authRouter);
}

module.exports = {routerHandler}