const boom = require('@hapi/boom');
const { models } = require('../../sequelize/sequelizeConnection');
const AmountController = require('./amountController');
const ClientController = require('./clientsController');
const PaymentController = require('./paymentController');


const clientController = new ClientController();
const paymentController = new PaymentController();
const amountController = new AmountController();

const paymentPendingStatus = 'pending';
const paymentCanceledStatus = 'paid';
const PaymentLate = 'mora';
const monthlyFeeStatusInactive = 'inactive';
const monthlyFeeStatusActive = 'inactive';

class MonthlyFeesController {
    async create(data) {
        const { from, untill } = data;

        const getMonthlyFees = await this.getAll();
        for (let i = 0; i < getMonthlyFees.length; i++) {
            const monthFees = getMonthlyFees[i];
            if (monthFees.status === monthlyFeeStatusActive) {
                throw boom.badRequest("Ya hay una factura de mes activa");
            }
        }

        const minDuration = 29 * 24 * 60 * 60 * 1000;
        if (new Date(untill) - new Date(from) < minDuration) {
            throw new Error('La diferencia entre "desde" y "hasta" debe ser al menos de 29 días.');
        }

        const monthlyFee = await models.MonthlyFees.create(data);
        const clients = await clientController.getAll();
        for (let i=0; i< clients.length; i++) {
            let clientId = clients[i].id;
            let amountId = clients[i].amountId;
            const adress = clients[i].Adress;

            const amount =  await amountController.getById(amountId);

            // Asignar el pago a todos los clientes
            const monthName = new Date().toLocaleString('default', { month: 'long' });
            const year = new Date().getFullYear();

            for (let i = 0; i < adress.length; i++) {
                const element = adress[i];
                await paymentController.create({
                    "clientId": clientId,
                    "month": monthName,
                    "adressId": element.id,
                    "year": year,
                    "amountPayable": amount.dataValues.amount,
                    "monthlyFeesId": monthlyFee.dataValues.id,
                    "status": "pending"
                });
            }
        }
        return monthlyFee;        
    }

    async getAll() {
        const monthlyFees = await models.MonthlyFees.findAll({
            include: [
                {
                    model: models.Payment,
                    as: 'paymentMonthlyFee',
                    include: [
                        {
                            model: models.Client,
                            as: 'Clients'
                        }
                    ]
                }
            ]
        });
        return monthlyFees; 
    }

    async getById(id) {
        const monthlyFee = await models.MonthlyFees.findByPk(id, {
            include: [
                {
                    model: models.Payment,
                    as: 'paymentMonthlyFee',
                    include: [
                        {
                            model: models.Client,
                            as: 'Clients'
                        }
                    ]
                }
            ]
        });
        if(!monthlyFee) {
            throw boom.notFound('Data not found');
        }
        return monthlyFee;
    }

    async closeMont(id){
        const monthlyFee = await this.getById(id);
        await this.updateMonthlyFee(monthlyFee.id, { status: monthlyFeeStatusInactive });
        const payment = await paymentController.getAll();
        for (let i = 0; i < payment.length; i++) {
            const getPayment = payment[i];
            if (getPayment.status === paymentPendingStatus) {
                await paymentController.updadtePayment(getPayment.id, {status: PaymentLate});
            }
        }
        return await this.getById(id);
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
