const { models } = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

class ClientController {
    async create(data) {
        const clients = await models.Client.create(data);
        return clients;
    }

    async getAll() {
        return await models.Client.findAll({
            include: ['Adress', 'Payment']
        });
    }

    async getAllW() {
        return await models.Client.findAll({
            include: ['Adress']
        });
    }

    async getById(id) {
        let client = await models.Client.findByPk(id);
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
        const client = await this.getById(id);
        return await client.update(data);
    }

    async deleteClient(id) {
        const client = await this.getById(id);
        await client.destroy();
    }
}

module.exports = ClientController;
