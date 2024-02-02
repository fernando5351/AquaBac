const boom = require('@hapi/boom')
const  router = require('express').Router()
const {validatorHandler} = require('../../middlewares/validatorHandler')
const authController = require('../controllers/authController');
const configuration = require('../../config/index');
const UserController = require('../controllers/userController')
const {login,recovery,recoveryPassword} = require('../schemas/authSchema')

const fs = require('fs')
const passport = require('passport');
const { error } = require('console');

const authServices = new authController;
const userServices = new UserController;

router.post('/login', 
    validatorHandler(login,'body'),
    passport.authenticate('local',{session:false}),
    async(req,res,next)=>{
        try {
            const user = req.user;
            const token = await authServices.sigInToken(user)
            res.status(200).json({
                statusCode: 200,
                data:user,
                token: token
            })
        } catch (error) {
            next(error)
        }
    }
);


router.post('/recovery',
    validatorHandler(recovery,'body'),
    async (req,res,next)=>{
        try {
            const {email} = req.body
            const user = await authServices.readByEmail(email)
            await userServices.updateUser(user.dataValues.id,{status:false});
            if (!user) {
                throw boom.unauthorized('error')
            }
            var token = await authServices.recovery(user.dataValues);
            var urlProd = ''
            var urlLocal = 'http://localhost:3000';
            var html ='';
            if (configuration.isProduction) {
                html = bodyHtml.replace('{{url}}', urlProd);
            }else{
                html = bodyHtml.replace('{{url}}',urlLocal);
            }
            const mail = mail.replace('{{token}}', token)
            await authServices.sendMail(user.dataValues,'Account recovery', null);
            res.status(200).send('operation successfully')
        } catch (error) {
            next(error)
        }
    }
)

router.post('/recovery-password',
    validatorHandler(recoveryPassword,'body'),
    async(req,res,next)=>{
        passport.authenticate('jwtRecovery',{session:false},async(err,user)=>{
            try {
                if (!user) {
                    throw boom.unauthorized('unauthorized, check your email')
                }
                const userUpdate = await authServices.updatePassword(req.body,user);
                res.status(202).json(userUpdate)
            } catch (error) {
                next(error)
            }
        })
    }
)


module.exports = router