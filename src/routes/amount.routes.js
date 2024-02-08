const router = require('express').Router();
const { validatorHandler } = require('../../middlewares/validatorHandler');
const { createAmount, updateAmount, getAmount, searchAmount } = require('../schemas/amountSchema');
const AmountController = require('../controllers/amountController');

const service = new AmountController();

router.post('/',
    validatorHandler(createAmount, 'body'),
    async (req, res, next) => {
        try {
            const amount = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Amount created Successfully!',
                data: amount
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    async (req, res, next) => {
        try {
            const amounts = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Amounts successfully',
                data: amounts
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getAmount, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const amount = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: 'Get Amount by id successfully',
                data: amount
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/search/amount',
    validatorHandler(searchAmount, 'params'),
    async (req, res, next) => {
        try {
            const { name } = req.params;
            const amounts = await service.searchAmount(name);
            res.status(200).json({
                statusCode: 200,
                message: `Amount with name ${name} found`,
                data: amounts
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getAmount, 'params'),
    validatorHandler(updateAmount, 'body'),
    async (req, res, next) => {
        try {
            const amount = await service.updateAmount(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: 'Update amount successfully',
                data: amount
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getAmount, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.deleteAmount(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Amount deleted successfully',
                data: parseInt(id)
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
