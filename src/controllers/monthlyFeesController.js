const boom = require('@hapi/boom');
const { models } = require('../../sequelize/sequelizeConnection');
const AmountController = require('./amountController');
const ClientController = require('./clientsController');
const PaymentController = require('./paymentController');


const clientController = new ClientController();
const paymentController = new PaymentController();
const amountController = new AmountController();
class MonthlyFeesController {
    async create(data) {
        const { from, untill } = data;

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
            //asignar mora
            for (let i = 0; i < clients[i].Payment.length; i++) {
                const payment = clients[i].Payment[i];
                console.log('estoy dentro de payment');
                if (payment.status === "pending") {
                    const update = await clientController.updateClient(clientId, {'status':'mora'});
                    console.log(update);
                };
            }
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
                    "amount": amount.dataValues.amount,
                    "monthlyFeesId": monthlyFee.dataValues.id,
                    "status": "pending"
                });
            }
        }
        return monthlyFee;        
    }

    async getAll() {
        const monthlyFees = await models.MonthlyFees.findAll();
        return monthlyFees;
    }

    async getById(id) {
        const monthlyFee = await models.MonthlyFees.findByPk(id);
        if(!monthlyFee) {
            throw boom.notFound('Data not found');
        }
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
