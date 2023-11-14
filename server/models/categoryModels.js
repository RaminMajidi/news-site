const { Sequelize } = require("sequelize");
const db = require("../config/DataBase");

const { DataTypes } = Sequelize;

const Category = db.define('category',
    {
        name: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true
    }
)

module.exports = Category
