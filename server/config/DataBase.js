const { Sequelize } = require("sequelize");

const db = new Sequelize("news-site", "khabarestan-user", "44TeW7", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;