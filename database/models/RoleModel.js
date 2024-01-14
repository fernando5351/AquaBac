const { Model, DataTypes } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    },
};

class Role extends Model {
    static associate(models) {
        this.hasOne(models.User, {
            as: 'Users',
            foreignKey: 'idRole',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Role',
            tableName: ROLE_TABLE,
            timestamps: false,
        };
    }
}

module.exports = {
    ROLE_TABLE,
    RoleModel,
    Role,
};
