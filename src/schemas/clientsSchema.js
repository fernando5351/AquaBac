const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const dui = Joi.string();
const cellphone = Joi.number();
const otherCellphone = Joi.number();
const direction = Joi.number().integer();
const amountId = Joi.number().integer();
const paymentStatus = Joi.string().valid('paid', 'pending', 'mora');

const createClient = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password,
    dui: dui.required(),
    cellphone: cellphone,
    otherCellphone: otherCellphone,
    amountId: amountId.required()
});

const updateClient = Joi.object({
    name: name,
    email: email,
    password: password,
    dui: dui,
    cellphone: cellphone,
    otherCellphone: otherCellphone,
    amountId
});

const getClient = Joi.object({
    id: id.required()
});

const  showPaymentsClients = Joi.object({
    paymentStatus
})

const searchClient = Joi.object({
    name: name.required()
});

module.exports = {
    createClient,
    updateClient,
    getClient,
    searchClient,
    showPaymentsClients
};
