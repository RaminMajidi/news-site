import { Sequelize } from "sequelize";

const db = new Sequelize("khabarestan","khabarestan-user","44TeW7",{
    host:"localhost",
    dialect:"mysql"
});

export default db;