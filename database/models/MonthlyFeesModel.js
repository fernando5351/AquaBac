const { Model, Sequelize, DataTypes } = require('sequelize');

const MONTHLYFEES_TABLE = 'monthly_fees';

const MonthlyFeesModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    from: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },
    untill: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['active', 'inactive']],
        },
        defaultValue: 'Active'
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
    }
};

class MonthlyFees extends Model {
    static associate(models) {
        this.hasMany(models.Payment ,{
            foreignKey: 'monthlyFeesId',
            as: 'paymentMonthlyFee'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: MONTHLYFEES_TABLE,
            modelName: 'MonthlyFees',
            timestamps: false
        }
    }
}

module.exports = {
    MONTHLYFEES_TABLE,
    MonthlyFeesModel,
    MonthlyFees
};
