const { models } = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');

class AmountController {
    async create(data) {
        const amount = await models.Amount.create(data);
        return amount;
    }

    async getAll() {
        const amounts = await models.Amount.findAll();
        if (amounts.length < 1) {
            throw boom.notFound('Data not found');
        }
        return amounts;
    }

    async getById(id) {
        const amount = await models.Amount.findByPk(id);
        if (!amount) {
            throw boom.notFound(`Amount with ${id} not found`);
        }
        return amount;
    }

    async updateAmount(id, data) {
        const amount = await this.getById(id);
        const amountUpdate = await amount.update(data);
        return amountUpdate;
    }

    async deleteAmount(id) {
        const amount = await this.getById(id);
        await amount.destroy();
    }
}

module.exports = AmountController;
