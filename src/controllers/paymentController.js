const { models } = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');
const AmountController = require('./amountController');

const amountController = new AmountController();
const amountName = 'mora';
const paymentInMora = 'mora';

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
        const payment = await models.Payment.findByPk(id, {
            include: ['paymentMonthlyFee']
        });
        if (!payment) {
            throw boom.notFound(`Payment with id ${id} not found`);
        }
        return payment;
    }

    async Pay(id, data) {
        const date = new Date();
        const dto = {
            ...data,
            candledIn: date
        }
        const getPayment = await this.getById(id);
        if (getPayment.status == paymentInMora) {
            const amount = await amountController.searchAmount(amountName);
            
        }
        const updatedPayment = await getPayment.update(dto);
        return updatedPayment;
    }

    async updadtePayment(id, data) {
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
