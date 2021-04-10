const sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    login: {
        type: sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
});

//User.sync({force: true});

module.exports = User;