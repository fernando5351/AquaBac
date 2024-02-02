const { Role, RoleModel } = require('../models/RoleModel');
const { User ,UserModel} = require('../models/UserModel');
const { Client, ClientModel} = require('../models/ClientsModel');
const { Adress, AdressModel} = require('../models/AddressModel');
const { MonthlyFees, MonthlyFeesModel} = require('../models/MonthlyFeesModel');
const { Payment, PaymentModel} = require('../models/PaymentModel');
const { Amount, AmountModel } = require('./amountModel');

function setUpModels(sequelize) {
    Role.init(RoleModel, Role.config(sequelize));
    User.init(UserModel, User.config(sequelize));
    Client.init(ClientModel, Client.config(sequelize));
    Adress.init(AdressModel, Adress.config(sequelize));
    MonthlyFees.init(MonthlyFeesModel, MonthlyFees.config(sequelize));
    Payment.init(PaymentModel, Payment.config(sequelize));
    Amount.init(AmountModel, Amount.config(sequelize));

    // Asociaciones
    Role.associate(sequelize.models);
    User.associate(sequelize.models);
    Client.associate(sequelize.models);
    Adress.associate(sequelize.models);
    MonthlyFees.associate(sequelize.models);
    Payment.associate(sequelize.models);
    Amount.associate(sequelize.models);
}

module.exports = { setUpModels };
