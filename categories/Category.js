const sequelize = require("sequelize");
const connection = require("../database/database")

const category = connection.define('categories', {
    title: {
        type: sequelize.STRING,
        AllowNull: false 
    },
    slug: {
        type: sequelize.STRING,
        AllowNull: false 
    },
})

module.exports = category;