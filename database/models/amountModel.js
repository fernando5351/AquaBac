const { Model, Sequelize, DataTypes } = require('sequelize');

const Amount_TABLE = 'amount';

const AmountModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: true
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
};

class Amount extends Model {
    static associate(models) {
        this.hasMany(models.Payment, {
            foreignKey: 'amount',
            as: 'Payments'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Amount',
            tableName: Amount_TABLE,
            timestamps: false
        }
    }
}

module.exports = {
    Amount_TABLE,
    AmountModel,
    Amount
};
