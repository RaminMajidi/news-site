const { Sequelize } = require("sequelize");
const db = require("../config/DataBase");

const { DataTypes } = Sequelize;

const Video = db.define('video', {
    video: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING }
}, {
    freezeTableName: true
})

module.exports = Video

