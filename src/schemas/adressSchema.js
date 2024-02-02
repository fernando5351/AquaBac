const Joi = require('joi');

const id = Joi.number().integer();
const streetName = Joi.string().allow(null);
const houseNumber = Joi.string();
const polygonNumber = Joi.string().allow(null);
const idClient = Joi.number().integer();

const createAddress = Joi.object({
  streetName: streetName,
  houseNumber: houseNumber.required(),
  polygonNumber: polygonNumber,
  idClient: idClient.required()
});

const updateAddress = Joi.object({
  streetName: streetName,
  houseNumber: houseNumber,
  polygonNumber: polygonNumber
});

const getAddress = Joi.object({
  id: id.required(),
});

const deleteAddress = Joi.object({
  id: id.required(),
});

module.exports = {
  createAddress,
  updateAddress,
  getAddress,
  deleteAddress,
};
