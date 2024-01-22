const router = require('express').Router();

const roleRouter = require('./role.routes');
const userRouter = require('./user.routes')

function routerHandler(app) {
    app.use('/api/v1', router);
    router.use('/role',roleRouter);
    router.use('/user',userRouter);
}

module.exports = {routerHandler}