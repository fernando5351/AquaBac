const { models } = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

class ClientController {
    async create(data) {
        const DTOclient = {
            name: data.name,
            email: data.email,
            password: data.password,
            dui: data.dui,
            cellphone: data.cellphone,
            otherCellphone: data.otherCellphone
        }

        const clients = await models.Client.create(DTOclient);
        const clientId = clients.id;
        console.log(clientId);
        const amountArray =  data.amountId;
        for (let i = 0; i < amountArray.length; i++) {
            const amount = {
                clientId: clientId,
                amountId: amountArray[i]
            };

            const resultAmount = await models.Amounts.create(amount);
            console.log(resultAmount);
        }
        return clients;
    }

    async getAll(paymentStatus) {
        const includeOptions = [
            {
                model: models.Adress,
                as: 'Adress',
            },
            {
                model: models.Amount,
                as: 'ClientAmounts'
            },
            {
                model: models.Payment,
                as: 'Payment',
                include: [
                    {
                        model: models.Adress,
                        as: 'Adress'
                    }
                ]
            }
        ];

        if (paymentStatus) {
            includeOptions[1].where = { status: paymentStatus };
        }
        return await models.Client.findAll({
            include: includeOptions
        });
    }

    async getById(id, paymentStatus) {
        const includeOptions = [
            {
                model: models.Adress,
                as: 'Adress',
            },
            {
                model: models.Amount,
                as: 'ClientAmounts'
            },
            {
                model: models.Payment,
                as: 'Payment',
                include: [
                    {
                        model: models.Adress,
                        as: 'Adress'
                    }
                ]
            }
        ];

        if (paymentStatus) {
            includeOptions[1].where = { status: paymentStatus };
        }
        
        let client = await models.Client.findByPk(id, {
            include: includeOptions
        });
        if (!client) throw boom.notFound("Client not found");
        return client;
    }

    async searchByName(name) {
        const clients = await models.Client.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` }
            },
        });
        if (!clients || clients.length === 0) {
            throw boom.notFound(`client with name ${name} not found`);
        }
        return clients;
    }

    async updateClient(id, data) {
        console.log(id + ' es y data: ' + data);
        console.log(data);
        const client = await this.getById(id);
        const clientUpdated = await client.update(data);
        return clientUpdated;
    }

    async deleteClient(id) {
        const client = await this.getById(id);
        await client.destroy();
    }
}

module.exports = ClientController;
