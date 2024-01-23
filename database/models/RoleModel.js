const { Model, DataTypes } = require('sequelize');

const ROLE_TABLE = 'role';

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
        this.hasMany(models.User, {
            foreignKey: 'idRole',
            as: 'Users'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'role',
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
