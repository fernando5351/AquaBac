const { Model, Sequelize, DataTypes } = require('sequelize');

const AMOUNT_TABLE = 'amount';

const AmountModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
};

class Amount extends Model {
    static associate(models) {
        this.belongsToMany(models.Client, {
            through: 'Amounts',
            foreignKey: 'amountId',
            otherKey: 'clientId',
            as: 'ClientsAmount'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Amount',
            tableName: AMOUNT_TABLE,
            timestamps: false
        }
    }
}

module.exports = {
    AMOUNT_TABLE,
    AmountModel,
    Amount
};
