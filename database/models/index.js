const { Role, RoleModel } = require('../models/RoleModel');
const { User ,UserModel} = require('../models/UserModel');

function setUpModels(sequelize) {
    Role.init(RoleModel, Role.config(sequelize));
    User.init(RoleModel, User.config(sequelize));



    // Asociaciones
    Role.associate(sequelize.models);
    User.associate(sequelize.models)

}

module.exports = { setUpModels };
