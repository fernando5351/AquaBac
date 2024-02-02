const Joi = require('joi');

const id = Joi.number().integer();
const idRole = Joi.number().integer();
const name = Joi.string();
const lastname = Joi.string();
const email = Joi.string();
const password = Joi.string();
const status = Joi.string();
const createdAt = Joi.string()


 const createUser = Joi.object({
    name: name.required(),
    idRole: idRole.required(),
    lastname: lastname.required(),
    email: email.required().email(),
    password: password.required(),
    createdAt: createdAt,
    status: status.required()
 });

 const searchUser = Joi.object({
   name: name.required()
 });
 
 const updateUser = Joi.object({
   name,
   lastname,
   idRole,
   status
 });

 const getUser = Joi.object({
   id: id.required()
 });

 module.exports = {
   createUser,
   searchUser,
   updateUser,
   getUser
 }

