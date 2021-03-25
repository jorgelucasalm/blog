const Sequelize = require("sequelize");

const sequelize = new Sequelize('guiapress','root','', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;