const router = require('express').Router();
const { validatorHandler } = require('../../middlewares/validatorHandler');
const {createMonthlyFee, getMonthlyFee, updateMonthlyFee } = require('../schemas/monthlyFeesSchema');
const { MonthlyFeesController } = require('../controllers/monthlyFeesController');

const service = new MonthlyFeesController();

router.post('/open',
    validatorHandler(createMonthlyFee, 'body'),
    async (req, res, next) => {
        try {
            const monthlyFee = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Monthly Fee created Successfully!',
                data: monthlyFee
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/close-month/:id', 
    validatorHandler(getMonthlyFee, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const closeMonth = await service.closeMont(id);
            res.status(200).json({
                statusCode: 200,
                message: 'month feess closed',
                data: closeMonth
            });
        } catch (error) {
            next(error);
        }
    }
)

router.get('/',
    async (req, res, next) => {
        try {
            const monthlyFees = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Monthly Fees successfully',
                data: monthlyFees
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getMonthlyFee, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const monthlyFee = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: 'Get Monthly Fee by id successfully',
                data: monthlyFee
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getMonthlyFee, 'params'),
    validatorHandler(updateMonthlyFee, 'body'),
    async (req, res, next) => {
        try {
            const monthlyFee = await service.updateMonthlyFee(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: 'Update Monthly Fee successfully',
                data: monthlyFee
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getMonthlyFee, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.deleteMonthlyFee(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Monthly Fee deleted successfully',
                data: parseInt(id)
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
    