const { models } = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

class ClientController {
    async create(data) {
        const clients = await models.Client.create(data);
        return clients;
    }

    async getAll(paymentStatus) {
        const whereOptions = {};

        if (paymentStatus) {
            whereOptions.status = paymentStatus;
        }
        console.log(whereOptions);
        return await models.Client.findAll({
            include: [
                {
                    model: models.Adress,
                    as: 'Adress',
                },
                {
                    model: models.Payment,
                    as: 'Payment',
                    where: (Object.keys(whereOptions).length !== 0) ? whereOptions : undefined
                }
            ]
        });
    }

    async getById(id, paymentStatus) {
        const whereOptions = {};

        if (paymentStatus) {
            whereOptions.status = paymentStatus;
        }
        let client = await models.Client.findByPk(id, {
            include: [
                {
                    model: models.Adress,
                    as: 'Adress',
                },
                {
                    model:  models.Payment,
                    as: 'Payment',
                    where: whereOptions
                }
            ]
        });
        if (!client) throw boom.notFound("Client not found");
        return client;
    }

    async searchByName(name) {
        const clients = await models.Client.findAll({
            where: {
                name: { [Op.like]: `%${name}%` }
            },
        });
        if (!clients || clients.length === 0) {
            throw boom.notFound(`client with name ${name} not found`);
        }
        return clients;
    }

    async updateClient(id, data) {
        console.log(id + ' es y data: ' + data);
        const client = await this.getById(id);
        return await client.update(data);
    }

    async deleteClient(id) {
        const client = await this.getById(id);
        await client.destroy();
    }
}

module.exports = ClientController;
