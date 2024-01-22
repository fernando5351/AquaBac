const {Model, DataTypes,Sequelize} = require('sequelize');
const {ROLE_TABLE} = require('./RoleModel');
const USER_TABLE ='users';

const UserModel = {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false,
    },
    status:{
        type:DataTypes.STRING,
        defaultvalue:'true',
        allowNull:false,
    },
    idRole:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'id_role',
        references:{
            model:ROLE_TABLE,
            key:'id'
        },
        onDelete:'set null',
        onUpdate:'cascade'
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultvalue: Sequelize.NOW
    }
}

class User extends Model{
    static associate(models){
        this.belongsTo(models.Role,{
            as:'role',
            foreignKey:'idRole'
        });
    }; 

    static config(sequelize){
        return{
            sequelize,
            modelname:'User',
            tablename: USER_TABLE,
            timestamps:false
        }
    }
};


module.exports={
    USER_TABLE,
    User,
    UserModel
}