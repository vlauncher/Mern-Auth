const { DataTypes } = require('sequelize');
const database = require('../config/db');
const bcrypt = require('bcryptjs');

const User = database.define('User',{
    first_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    last_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
        validate:{
            min:6,
            max:120
        }
    },
},{tableName:'users',
    hooks : {
        beforeCreate : async(user)=>{
            user.password = await bcrypt.hash(user.password,10);
        },
    } 
})

module.exports = User;