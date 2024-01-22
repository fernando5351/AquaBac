const router = require('express').Router();
const UserController  = require('../controllers/userController');
const {createUser,updateUser,getUser, searchUser} = require('../schemas/userSchema');
const {validatorHandler} = require('../../middlewares/validatorHandler');
const authController =  require('../controllers/authController');
const { valid } = require('joi');

const authService = new authController;
const userService = new UserController;

router.get('/',     
    async(req,res,next)=>{
        try {
            const user = await userService.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'User fetched succesfully',
                data: user
            })
        } catch (error) {
            next(error)            
        }
    }
)

router.get('/:id',
    validatorHandler(getUser,'params'),
    async(req,res,next)=>{
        try {
            const {id} = req.params;
            const user = await userService.getById(id);
            res.status(200).json({
                statusCode : 200 ,
                message:'User found successfully' ,
                data: user
            })
        } catch (error) {
            next(error)
        }
    }
)


router.post('/register',
    validatorHandler(createUser,'body'),
    async(req,res,next)=>{
        try {
            const user = await userService.createUser(req.body)
            const tokenLogin = await authService.sigInToken(user);
            res.status(201).json({
                statusCode: 201,
                message:"User created successfully",
                data:user,
                token:tokenLogin,
            })
        } catch (error) {
            next(error)
        }
    }
)

router.get('/search/:name',
    validatorHandler(searchUser),
        async(req,res,next)=>{
            try {
                const {name} = req.params;
                const user = await userService.searchByName(name);
                res.status(200).json({
                    statusCode:200,
                    message:`Searched ${name}:`,
                    data:user
                })
            } catch (error) {
                next(error)
            }
        }
)


router.patch('/:id',
        validatorHandler(getUser,'id'),
        validatorHandler(updateUser, 'body'),
        async(req,res,next)=>{
            try {
                const {id} = req.params;
                const user = await userService.updateUser(id,req.body,);
                res.status(200).json({
                    statusCode: 200,
                    message:'Updated User ',
                    data:user
                })
            } catch (error) {   
                next(error)
            }

        }
)


router.delete('/:id',
        validatorHandler(getUser,'id'),
        async (req,res,next)=> {
            try {
                const {id} = req.params;
                await userService.deleteUser(id);
                res.status(200).json({
                    statusCode:200,
                    message: 'User deleted',
                    data: id
                })
            } catch (error) {
                next(error)
            }
        }
)

module.exports = router