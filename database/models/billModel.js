const { DataTypes } = require("sequelize");

const billModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    amountPaid: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0
    },
    latePaymentAmount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        default: 0
    },
}