const { Model, DataTypes, Sequelize } = require('sequelize');
const { Amount_TABLE } = require('./amountModel');

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
        allowNull: true
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
    amountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Amount_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
    }
}

class Client extends Model {
    static associate(models) {
        this.hasMany(models.Adress, {
            as: 'Adress',
            foreignKey: 'idClient'
        });
        this.hasMany(models.Payment, {
            foreignKey: 'clientId',
            as:  'Payment'
        });
        this.belongsTo(models.Amount, {
            foreignKey: 'amountId',
            as: 'amountPayment',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Client',
            tableName: CLIENT_TABLE,
            timestamps: false
        }
    }
}

module.exports = {
    CLIENT_TABLE,
    ClientModel,
    Client
}