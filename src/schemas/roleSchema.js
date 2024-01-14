const Joi = require('joi');

const id = Joi.number().integer()
const name = Joi.string();
const status = Joi.string();


const createRole = Joi.object({
    name: name.required(),
    status: status
})


const getRole = Joi.object({
    id: id.required(),
})


const search = Joi.object({
    name: name.required()
})


const updateRole = Joi.object({
    name: name,
    status: status
})



module.exports = {
    createRole,
    getRole,
    search,
    updateRole,
}