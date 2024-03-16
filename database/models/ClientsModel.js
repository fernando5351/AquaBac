const { Model, DataTypes, Sequelize } = require('sequelize');

const CLIENT_TABLE = 'clients'; // Cambié el nombre a plural para seguir una convención de nombres

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
        type: DataTypes.STRING,
        allowNull: true
    },
    otherCellphone: {
        type: DataTypes.STRING,
        allowNull: true
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
        this.belongsToMany(models.Amount, {
            through: 'Amounts',
            foreignKey: 'clientId',
            otherKey: 'amountId',
            as: 'ClientAmounts'
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
