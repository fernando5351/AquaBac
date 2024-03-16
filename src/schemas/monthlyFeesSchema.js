const Joi = require('joi');

const id = Joi.number().integer();
const from = Joi.date();
const untill = Joi.date();
const status = Joi.string().valid('active', 'inactive');

const createMonthlyFee = Joi.object({
    from: from.required(),
    untill: from.required(),
    status
});

const updateMonthlyFee = Joi.object({
    from,
    untill,
    status
});

const getMonthlyFee = Joi.object({
    id
});

module.exports = {
    createMonthlyFee,
    updateMonthlyFee,
    getMonthlyFee
};
