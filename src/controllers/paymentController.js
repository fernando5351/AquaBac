const { models } = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');

class PaymentController {
    async create(data) {
        console.log(data);
        const payment = await models.Payment.create(data);
        return payment;
    }

    async getAll() {
        const payments = await models.Payment.findAll({
            include: ['paymentMonthlyFee', 'Clients']
        });
        return payments;
    }

    async getById(id) {
        const payment = await models.Payment.findByPk(id);
        if (!payment) {
            throw boom.notFound(`Payment with id ${id} not found`);
        }
        return payment;
    }

    async updatePayment(id, data) {
        const payment = await this.getById(id);
        const updatedPayment = await payment.update(data);
        return updatedPayment;
    }

    async deletePayment(id) {
        const payment = await this.getById(id);
        await payment.destroy();
    }
}

module.exports = PaymentController;
