const { Model, Sequelize, DataTypes } = require('sequelize');
const { CLIENT_TABLE } = require('./ClientsModel');
const { MONTHLYFEES_TABLE } = require('./MonthlyFeesModel');
const { Amount_TABLE } = require('./amountModel');
const { ADRESS_TABLE } = require('./AddressModel');

const PAYMENT_TABLE = 'payment';

const PaymentModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    invoiceCod: {
        type: DataTypes.BIGINT,
        allowNull: true
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
    adressId: {
        type: DataTypes.INTEGER,
        references: {
            model: ADRESS_TABLE,
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
    amountPayable: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    latePaymentAmount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0
    },
    totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['paid', 'pending', 'mora']],
        },
        defaultValue: "pending"
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
    },
    candledIn: {
        type: DataTypes.DATE,
        allowNull:true,
        field: 'candled_in'
    }
};

class Payment extends Model {
    static associate(models) {
        this.belongsTo(models.MonthlyFees ,{
            foreignKey: 'monthlyFeesId',
            as: 'paymentMonthlyFee'
        });
        this.belongsTo(models.Client, {
            foreignKey: 'clientId',
            as:  'Clients'
        });
        this.belongsTo(models.Adress, {
            foreignKey: 'adressId',
            as: 'Adress'
        });
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
