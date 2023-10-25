import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Video = db.define('video', {
    video: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING }
}, {
    freezeTableName: true
})

export default Video