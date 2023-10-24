import { Sequelize } from "sequelize";
import db from "../config/DataBase.js"
const { DataTypes } = Sequelize;

// This user is created new Table in DataBase 
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

export default Users