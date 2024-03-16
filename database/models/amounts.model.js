const { Model, Sequelize, DataTypes } = require('sequelize');
const { CLIENT_TABLE } = require('./ClientsModel');
const { AMOUNT_TABLE } = require('./amountModel');

const AMOUNTS_TABLE = 'amounts';

const AmountsModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    clientId: {
        type: DataTypes.INTEGER,
        references: {
            model: CLIENT_TABLE,
            key: 'id'
        },
        allowNull: false,
    },
    amountId: {
        type: DataTypes.INTEGER,
        references: {
            model: AMOUNT_TABLE,
            key: 'id'
        },
        allowNull: false,
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
};

class Amounts extends Model {   

    static associate(models) {

    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Amounts',
            tableName: AMOUNTS_TABLE,
            timestamps: false
        }
    }
}   

module.exports = {
    AMOUNTS_TABLE,
    AmountsModel,
    Amounts
};
