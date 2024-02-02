const router = require('express').Router();
const { validatorHandler } = require('../../middlewares/validatorHandler');
const {
    createPayment,
    updatePayment,
    getPayment,
    searchPayment,
} = require('../schemas/paymentSchema');
const PaymentController = require('../controllers/paymentController');

const paymentService = new PaymentController();

router.post(
    '/',
    validatorHandler(createPayment, 'body'),
    async (req, res, next) => {
        try {
            const payment = await paymentService.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Payment created successfully!',
                data: payment,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', async (req, res, next) => {
    try {
        const payments = await paymentService.getAll();
        res.status(200).json({
            statusCode: 200,
            message: 'Get all payments successfully',
            data: payments,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', validatorHandler(getPayment, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await paymentService.getById(id);
        res.status(200).json({
            statusCode: 200,
            message: 'Get payment by ID successfully',
            data: payment,
        });
    } catch (error) {
        next(error);
    }
});

router.get(
    '/search/month',
    validatorHandler(searchPayment, 'query'),
    async (req, res, next) => {
        try {
            const { month } = req.query;
            const payments = await paymentService.searchByMonth(month);
            res.status(200).json({
                statusCode: 200,
                message: `Payments for month ${month}`,
                data: payments,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    '/:id',
    validatorHandler(getPayment, 'params'),
    validatorHandler(updatePayment, 'body'),
    async (req, res, next) => {
        try {
            const payment = await paymentService.updatePayment(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: 'Update payment successfully',
                data: payment,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', validatorHandler(getPayment, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        await paymentService.deletePayment(id);
        res.status(202).json({
            statusCode: 202,
            message: 'Payment deleted successfully',
            data: parseInt(id),
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
