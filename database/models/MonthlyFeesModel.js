const { Model, Sequelize, DataTypes } = require('sequelize');

const MONTHLYFEES_TABLE = 'payment';

const MonthlyFeesModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultvalue: Sequelize.NOW
    }
};

class MonthlyFees extends Model {
    static associate(models) {}

    static config(sequelize) {
        return {
            sequelize,
            tableName: MONTHLYFEES_TABLE,
            modelName: 'MonthlyFees',
            timestamps: true,
        }
    }
}

module.exports = {
    MONTHLYFEES_TABLE,
    MonthlyFeesModel,
    MonthlyFees
};
