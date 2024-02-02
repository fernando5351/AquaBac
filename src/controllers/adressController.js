const boom = require('@hapi/boom');
const {models} = require('../../sequelize/sequelizeConnection');
const {Op} = require('sequelize');


class AdressController  {

    async create(data){
        console.log(models);
        const direction = await models.Adress.create(data);
        return direction;
    }

    async getAll() {
        const direction = await models.Adress.findAll();

        if (direction.length === 0) {
            throw boom.notFound('Direction not found');
        }
        return direction;
    }
    
    async getById(id){
        const direction = await models.Adress.findByPk(id);
        if (!direction) {
            throw boom.notFound(`Adress with ${id} not found`)
        }
        return direction;
    }

    async searchByName(name){
        const adress = await models.Adress.findAll(name,{
            where:{
                streetName:{
                    [Op.like]: `%${name}%`
                }
            }
        });
        if (!adress) {
            throw boom.notFound(`Adress with the name ${name} not found `)
        }
        return adress;
    }

    async update(id,data){
        const adress = await this.getById(id)
        const adressUpdated = await adress.update(data);
        return adressUpdated;
    }


    async delete(id){
        const adress = await this.getById(id)
        await adress.destroy()
    }
}


module.exports = AdressController;