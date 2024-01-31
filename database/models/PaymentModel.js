const { Model, Sequelize, DataTypes } = require('sequelize');
const { CLIENT_TABLE } = require('./ClientsModel');
const { MONTHLYFEES_TABLE } = require('./MonthlyFeesModel');
const { Amount_TABLE } = require('./amountModel');

const PAYMENT_TABLE = 'payment';

const PaymentModel = {
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Amount_TABLE,
            key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM('paid', 'pending', 'mora'),
        defaultValue: 'pending'
    },
    monthlyFeesId: {
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
        defaultValue: Sequelize.NOW
    }
};

class Payment extends Model {
    static associate(models) {
        this.belongsTo(models.Amount, {
            foreignKey: 'amount',
            as: 'amountPayment',
        });
        this.belongsTo(models.MonthlyFees ,{
            foreignKey: 'monthlyFeesId',
            as: 'paymentMonthlyFee'
        });
        this.belongsTo(models.Client, {
            foreignKey: 'clientId',
            as:  'Clients'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PAYMENT_TABLE,
            modelName: 'Payment',
            timestamps: false,
        }
    }
}

module.exports = {
    PAYMENT_TABLE,
    PaymentModel,
    Payment
};
