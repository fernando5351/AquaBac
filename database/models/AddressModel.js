const { Model, DataTypes, Sequelize } = require('sequelize');

const ADRESS_TABLE = 'adress';

const AdressModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    streetName: {
        type: DataTypes.STRING(),
        allowNull: true
    },
    houseNumber: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    polygonNumber: {
        type: DataTypes.STRING(),
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}

class Adress extends Model {
    static associate(models) {}

    static config(sequelize){
        return {
            sequelize,
            modelName: 'AdressModel',
            tableName: ADRESS_TABLE,
            timestamps: true
        }
    }
}

module.exports = {
    ADRESS_TABLE,
    AdressModel,
    Adress
}