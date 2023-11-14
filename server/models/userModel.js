const { Sequelize } = require("sequelize");
const db = require("../config/DataBase");

const { DataTypes } = Sequelize;


const Users = db.define("users", {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        freezeTableName: true,
    }

)

module.exports = Users