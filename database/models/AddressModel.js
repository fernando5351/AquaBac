const { Model, DataTypes, Sequelize } = require('sequelize');
const { CLIENT_TABLE } = require('./ClientsModel');

const ADRESS_TABLE = 'adress';

const AdressModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idClient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: CLIENT_TABLE,
            key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    },
    streetName: {
        type: DataTypes.STRING(),
        allowNull: true
    },
    houseNumber: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    polygonNumber: {
        type: DataTypes.STRING(),
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}

class Adress extends Model {
    static associate(models) {
        this.belongsTo(models.Client, {
            as: 'Client',
            foreignKey: 'idClient'
        })
    }

    static config(sequelize){
        return {
            sequelize,
            modelName: 'Adress',
            tableName: ADRESS_TABLE,
            timestamps: false
        }
    }
}

module.exports = {
    ADRESS_TABLE,
    AdressModel,
    Adress
}