const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number();
const name  = Joi.string();

const createAmount = Joi.object({
    amount: amount.required(),
    name: name.required()
});

const getAmount = Joi.object({
    id: id.required(),
});

const updateAmount = Joi.object({
    amount: amount
});

const searchAmount = Joi.object({
    name: name.required()
});

module.exports = {
    createAmount,
    getAmount,
    updateAmount,
    searchAmount,
};
