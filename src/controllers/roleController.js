const {models} = require('../../sequelize/sequelizeConnection');
const boom = require('@hapi/boom');
const {Op} = require('sequelize');


class RoleController {
    async create (data){
        console.log("data received",data);
        const role = await models.Role.create(data);
        return role
    }

    async getAll(){
        const role = await models.Role.findAll({
            include: ['Users']
        });
        if (role < 1) {
            throw boom.notFound('Data not found')
        }
        return role
    }

    async getById(id){
        const role = await models.Role.findByPk(id);
        if (!role) {
            throw boom.notFound(`Role with ${id} not found`)
        }
        return role
    }


    async searchByName(name){
        const role = await models.Role.findAll({
            where:{
                name:{[Op.like]: `%${name}%`}
            },
        });
        if (!role) {
            throw boom.notFound(`Role not found`)
        }
        return role
    }

    async updateRole(id,data){
        const role = await this.getById(id)
        const roleUpdate = await role.update(data)
        return roleUpdate
    }

    async deleteRole(id){
        const role =  await this.getById(id)
        await role.destroy();
    }

};

module.exports = {
    RoleController
}