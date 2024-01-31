const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number();

const createAmount = Joi.object({
    amount: amount.required(),
});

const getAmount = Joi.object({
    id: id.required(),
});

const updateAmount = Joi.object({
    amount: amount
});

const searchAmount = Joi.object({
    amount: amount.required()
});

module.exports = {
    createAmount,
    getAmount,
    updateAmount,
    searchAmount,
};
