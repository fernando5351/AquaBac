const { Model, DataTypes, Sequelize, val } = require('sequelize');
const { PAYMENT_TABLE } = require('./PaymentModel');
const { ADRESS_TABLE } = require('./AddressModel');

const CLIENT_TABLE = 'client';

const ClientModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dui:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cellphone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otherCellphone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    direction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: ADRESS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultvalue: Sequelize.NOW
    }
}

class Client extends Model {
    static associate(models) {}

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'ClientsModel',
            tableName: CLIENT_TABLE,
            timestamps: true
        }
    }
}

module.exports = {
    CLIENT_TABLE,
    ClientModel,
    Client
}