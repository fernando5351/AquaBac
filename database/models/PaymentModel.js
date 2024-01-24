const { Model, Sequelize, DataTypes } = require('sequelize');
const { CLIENT_TABLE } = require('./ClientsModel');
const { MONTHLYFEES_TABLE } = require('./MonthlyFeesModel');

const PAYMENT_TABLE = 'payment';

const PaymentModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: CLIENT_TABLE,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('paid', 'pending'),
        defaultValue: 'pending'
    },
    monthlyFees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MONTHLYFEES_TABLE,
            key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultvalue: Sequelize.NOW
    }
};

class Payment extends Model {
    static associate(models) {}

    static config(sequelize) {
        return {
            sequelize,
            tableName: PAYMENT_TABLE,
            modelName: 'Payment',
            timestamps: true,
        }
    }
}

module.exports = {
    PAYMENT_TABLE,
    PaymentModel,
    Payment
};
