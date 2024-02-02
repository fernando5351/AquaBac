const Joi = require('joi');

const id = Joi.number().integer();
const from = Joi.date();
const untill = Joi.date();

const createMonthlyFee = Joi.object({
    from: from.required(),
    untill: from.required()
});

const updateMonthlyFee = Joi.object({
    from,
    untill
});

const getMonthlyFee = Joi.object({
    id
});

module.exports = {
    createMonthlyFee,
    updateMonthlyFee,
    getMonthlyFee
};
