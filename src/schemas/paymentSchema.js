const Joi = require('joi');

const id = Joi.number().integer();
const clientId = Joi.number().integer();
const month = Joi.string();
const year = Joi.number().integer();
const amount = Joi.number();
const status = Joi.string().valid('paid', 'pending', 'mora');
const monthlyFeesId = Joi.number().integer();

const createPayment = Joi.object({
    clientId: clientId.required(),
    month: month.required(),
    year: year.required(),
    amount: amount.required(),
    status: status,
    monthlyFeesId: monthlyFeesId.required()
});

const updatePayment = Joi.object({
    clientId,
    month,
    year,
    amount,
    status,
    monthlyFeesId
});

const searchPayment = Joi.object({
    month: month.required()
})

const getPayment = Joi.object({
    id: id.required()
});

module.exports = {
    createPayment,
    updatePayment,
    getPayment,
    searchPayment
};
