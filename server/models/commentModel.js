import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import News from "./newsModel.js";

const { DataTypes } = Sequelize

const Comments = db.define('comments', {
    newsId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        freezeTableName: true
    })


News.hasMany(Comments)
Comments.belongsTo(News)

export default Comments