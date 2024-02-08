const router = require('express').Router();
const {validatorHandler} = require('../../middlewares/validatorHandler')
const {createRole,updateRole,getRole, search} = require('../schemas/roleSchema')
const {RoleController} = require('../controllers/roleController');

const service = new RoleController;

router.post('/',
     validatorHandler(createRole,'body'),
    async(req,res,next) => {
        try {
            const role = await service.create(req.body)
            res.status(201).json({
                statusCode: 201,
                message:'Role created Successfully!',
                data: role
            })
        } catch (error) {
            next(error)
        }
    }
)

router.get('/',
    async(req,res,next) => {
        try {
            const roles = await service.getAll();
            res.status(200).json({
                statusCode : 200 ,
                message : 'Get all Roles successfully' ,
                data : roles
            })
        } catch (error) {
            next(error)
        }
    }
)

router.get('/:id',
    validatorHandler(getRole, 'params'),
    async(req,res,next) => {
        try {
            const {id} = req.params;
            const role = await service.getById(id)
            res.status(200).json({
                statusCode : 200 ,
                message : "Get Role by id succesfully" ,
                data: role
            })
        } catch (error) {
            next(error)   
        }
    }
)

router.get('/search/:name',
   
    async(req,res,next) => {
       try {
        const {name} = req.params;
        const role = await service.searchByName(name)
        res.status(200).json({
            statusCode : 200 ,
            message : `role with name ${name} found`,
            data : role
        })
       } catch (error) {
            next(error)
       }
    }
)

router.patch('/:id',
    validatorHandler(getRole, 'params'),
    validatorHandler(updateRole, 'body'),
    async (req,res,next)=>{
        try {
            const role = await service.updateRole(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message:"Update role successfully",
                data: role
            })
        } catch (error) {
            next(error)
        }
    }
);


router.delete('/:id',
    validatorHandler(getRole,'params'),
    async(req,res,next) => {
        try {
            const { id } = req.params;
            await service.deleteRole(id)
            res.status(200).json({
                statusCode: 200,
                message: 'role deleted succesfully',
                data: parseInt(id)
            })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
