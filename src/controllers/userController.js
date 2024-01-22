const boom = require('@hapi/boom');
const {models} = require('../../sequelize/sequelizeConnection');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');
const { consumers } = require('nodemailer/lib/xoauth2');


class UserController  {

    async createUser(data){
        const hash = await bcrypt.hash(data.password,10);
        const dto = {
            ...data,
            password: hash
        };
        const user = await models.User.create(dto);
        delete user.dataValues.password;
        return user
    }

    async getAll() {
        const users = await models.User.findAll({
            include: [{ model: models.Role, as: 'role' }],
            attributes: { exclude: ['password'] }
        });
    
        if (users.length === 0) {
            throw boom.notFound('Users not found bro');
        }
        return users;
    }
    
    async getById(id){
        const user = await models.User.findByPk(id,{
            include: ['Role']
        });
        if (!user) {
            throw boom.notFound(`User with ${id} not found`)
        }
        return user
    }

    async searchByName(name){
        const user = await models.User.findAll(name,{
            where:{
                name:{
                    [Op.like]: `%${name}%`
                }
            }
        });
        if (!user) {
            throw boom.notFound(`User with the name ${name} not found `)
        }
        return user
    }

    async updateUser(id,data){
        const user = await this.getById(id)
        const userUpdate = await user.update(data);
        return userUpdate
    }


    async deleteUser(id){
        const user = await this.getById(id)
        await user.destroy()
    }
}


module.exports = UserController