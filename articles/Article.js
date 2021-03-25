const sequelize = require("sequelize");
const connection = require("../database/database")
const category = require("../categories/Category")

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

// Uma categoria tem muitos artigos
category.hasMany(article);
// Um artigo pertence a uma categoria
article.belongsTo(category);

module.exports = article;