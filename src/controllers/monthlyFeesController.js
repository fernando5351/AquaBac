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
        try {
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
            const amount =  await amountController.getById(amountId);
            //asignar mora
            for (let i = 0; i < clients[i].Payment.length; i++) {
                const payment = clients[i].Payment[i];
                
                if (payment.status === "pending") {
                    await clientController.updateClient(clientId, {'status':'mora'});
                };
            }
            // Asignar el pago a todos los clientes
            const monthName = new Date().toLocaleString('default', { month: 'long' });
            const year = new Date().getFullYear();

            for (let i = 0; i < clients[i].Adress.length; i++) {
                const adress = clients[i].Adress[i];
                console.log(adress);
                console.log(adress.id + ' => id de direcion del usuario => ' + clientId);

                const payment = await paymentController.create({
                    "clientId": clientId,
                    "month": monthName,
                    "adressId": adress.id,
                    "year": year,
                    "amount": amount.dataValues.amount,
                    "monthlyFeesId": monthlyFee.dataValues.id,
                    "status": "pending"
                });
                console.log(payment);
            };
        }
        return monthlyFee;
        } catch (error) {
            console.log(error);
        }
        
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