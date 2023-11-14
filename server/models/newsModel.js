const { Sequelize } = require("sequelize");
const db = require("../config/DataBase");
const Users = require('./userModel')
const Category = require('./categoryModels')

const { DataTypes } = Sequelize

const News = db.define('news', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    numViews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
},
    { freezeTableName: true }
)

//Create relationship between database tables
Users.hasMany(News)
News.belongsTo(Users, { foreignKey: 'userId' })
Category.hasMany(News)
News.belongsTo(Category, { foreignKey: 'categoryId' })
// *************************************************


module.exports = News

