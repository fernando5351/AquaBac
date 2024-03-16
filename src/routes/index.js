const router = require('express').Router();

const roleRouter = require('./role.routes');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const adressRouter = require('./adress.routes');
const clientsRouter = require('./clients.routes');
const monthlyFessRouter = require('./monthlyFess.routes');
const paymentRouter = require('./payment.routes');
const amountRouter = require('./amount.routes');

function routerHandler(app) {
    app.use('/api/v1', router);
    router.use('/role',roleRouter);
    router.use('/user',userRouter);
    router.use('/auth',authRouter);
    router.use('/clients', clientsRouter);
    router.use('/adress', adressRouter);
    router.use('/monthlyfees', monthlyFessRouter);
    router.use('/payment', paymentRouter);
    router.use('/amount', amountRouter);
}

module.exports = {routerHandler}