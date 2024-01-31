const router = require('express').Router();
const { validatorHandler } = require('../../middlewares/validatorHandler');
const AdressController = require('../controllers/adressController');
const { getAddress, createAddress, searchAddress, updateAddress, deleteAddress } = require('../schemas/adressSchema');

const service = new AdressController;

router.post('/',
    validatorHandler(createAddress, 'body'),
    async (req, res, next) => {
        try {
            const address = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Address created Successfully!',
                data: address
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    async (req, res, next) => {
        try {
            const addresses = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Addresses successfully',
                data: addresses
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getAddress, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const address = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: "Get Address by id successfully",
                data: address
            });
        } catch (error) {
            next(error);
        }
    }
);

// router.get('/search/name',
//     validatorHandler(searchAddress, 'params'),
//     async (req, res, next) => {
//         try {
//             const { name } = req.params;
//             const address = await service.searchByName(name);
//             res.status(200).json({
//                 statusCode: 200,
//                 message: `Address with name ${name} found`,
//                 data: address
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
// );

router.patch('/:id',
    validatorHandler(getAddress, 'params'),
    validatorHandler(updateAddress, 'body'),
    async (req, res, next) => {
        try {
            const address = await service.update(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: "Update address successfully",
                data: address
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(deleteAddress, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Address deleted successfully',
                data: parseInt(id)
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
