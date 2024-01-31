const router = require('express').Router();
const { validatorHandler } = require('../../middlewares/validatorHandler');
const { createClient, getClient, searchClient, updateClient, showPaymentsClients } = require('../schemas/clientsSchema');
const ClientController = require('../controllers/clientsController');

const service = new ClientController;

router.post('/',
    validatorHandler(createClient, 'body'),
    async (req, res, next) => {
        try {
            const client = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'Client created Successfully!',
                data: client
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    validatorHandler(showPaymentsClients, 'query'),
    async (req, res, next) => {
        try {
            const clients = await service.getAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Get all Clients successfully',
                data: clients
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getClient, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await service.getById(id);
            res.status(200).json({
                statusCode: 200,
                message: 'Get Client by id successfully',
                data: client
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/search/name',
    validatorHandler(searchClient, 'params'),
    async (req, res, next) => {
        try {
            const { name } = req.params;
            const clients = await service.searchByName(name);
            res.status(200).json({
                statusCode: 200,
                message: `Clients with name ${name} found`,
                data: clients
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getClient, 'params'),
    validatorHandler(updateClient, 'body'),
    async (req, res, next) => {
        try {
            const client = await service.updateClient(req.params.id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: 'Update client successfully',
                data: client
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getClient, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.deleteClient(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Client deleted successfully',
                data: parseInt(id)
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
