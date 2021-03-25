const sequelize = require("sequelize");
const connection = require("../database/database")

const article = connection.define('articles', {
    title: {
        type: sequelize.STRING,
        AllowNull: false 
    },
    slug: {
        type: sequelize.STRING,
        AllowNull: false 
    },
    body: {
        type: sequelize.TEXT,
        AllowNull: false 
    }
})

module.exports = article;