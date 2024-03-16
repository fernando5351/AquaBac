const { models } = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');
const AmountController = require('./amountController');
const { Op } = require('sequelize');

const amountController = new AmountController();
const amountName = 'mora';
const paymentInMora = 'mora';
const paymentStatusPaid = 'paid';

function generateInvoiceCode() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    const invoiceCode = `${year}${month}${day}${hour}${minutes}${seconds}${milliseconds}`;
    
    return invoiceCode;
}
  
class PaymentController {
    async create(data) {
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
            include: ['paymentMonthlyFee', 'Clients']
        });
        if (!payment) {
            throw boom.notFound(`Payment with id ${id} not found`);
        }
        return payment;
    }

    async Pay(id, data) {
        const date = new Date();
        
        const getPayment = await this.getById(id);
        if (getPayment.status === paymentStatusPaid) {
            throw boom.conflict('This payment has already been paid')
        }
        const amountPayable = getPayment.dataValues.amountPayable;
        let mora = '';
        let latePaymentAmount = '';
        if (getPayment.status == paymentInMora) {
            mora = await amountController.searchAmount(amountName);
            latePaymentAmount = mora.dataValues.amount;
        }
        let totalAmountToBePaid = amountPayable + latePaymentAmount;
        totalAmountToBePaid = Number(totalAmountToBePaid).toFixed(2);
        const dataAmount = Number(data.totalAmount).toFixed(2);
        if (dataAmount !== totalAmountToBePaid) {
            throw boom.badRequest('El monto a pagar debe ser: $'+totalAmountToBePaid);
        }

        const dto = {
            ...data,
            candledIn: date,
            invoiceCod: generateInvoiceCode(),
            totalAmount: totalAmountToBePaid
        }
        const updatedPayment = await getPayment.update(dto);
        return updatedPayment;
    }

    async report(from, until,  status) {
        let  where = {
            createdAt: {
                [Op.between]: [from, until]
            },
            canceledIn: {
                [Op.between]: [from, until]
            }
        };

        if (status) {
            where.status = status;
        }
        const payments = await  models.Payment.findAll({
            include: ['paymentMonthlyFee', 'Clients'],
            where: where
        });

        const totalAmountCollected = payments.reduce((total, payment) => {
            if (payment.dataValues.status === 'paid') {
                total + payment.amountPayable
            }
        }, 0);

        let summary = {
            paid: 0,
            mora: 0,
            pending: 0
        };

        payments.forEach(payment => {
            switch (payment.status) {
                case 'paid':
                    summary.paid = summary.paid + payment.totalAmount;
                    break;
                case 'mora':
                    summary.mora = summary.mora +  payment.latePaymentAmount + payment.amountPayable;
                    break;
                case 'pending':
                    summary.pending = summary.pending + payment.amountPayable;
                    break;
            }
        });

        return {
            totalAmountCollected,
            summary,
            payments
        };
    }

    async updadtePayment(id, data) {
        const payment = await this.getById(id);
        await payment.update(data);
        return await this.getById(id);
    }

    async deletePayment(id) {
        const payment = await this.getById(id);
        await payment.destroy();
    }
}

module.exports = PaymentController;
