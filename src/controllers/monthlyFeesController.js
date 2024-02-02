const { models } = require('../../sequelize/sequelizeConnection');

class MonthlyFeesController {
    async create(data) {
        const { from, untill } = data;

        const minDuration = 29 * 24 * 60 * 60 * 1000;
        if (new Date(untill) - new Date(from) < minDuration) {
            throw new Error('La diferencia entre "desde" y "hasta" debe ser al menos de 29 días.');
        }

        const monthlyFee = await models.MonthlyFees.create(data);
        return monthlyFee;
    }

    async getAll() {
        const monthlyFees = await models.MonthlyFees.findAll();
        return monthlyFees;
    }

    async getById(id) {
        const monthlyFee = await models.MonthlyFees.findByPk(id);
        return monthlyFee;
    }

    async updateMonthlyFee(id, data) {
        const monthlyFee = await this.getById(id);
        const updatedMonthlyFee = await monthlyFee.update(data);
        return updatedMonthlyFee;
    }

    async deleteMonthlyFee(id) {
        const monthlyFee = await this.getById(id);
        await monthlyFee.destroy();
    }
}

module.exports = {
    MonthlyFeesController
};
