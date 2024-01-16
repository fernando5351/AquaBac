const router = require('express').Router();

const roleRouter = require('../routes/role.routes')

function routerHandler(app) {
    app.use('/api/v1', router);
    router.use('/role',roleRouter)
}

module.exports = {routerHandler}