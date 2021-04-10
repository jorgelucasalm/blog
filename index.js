const express = require("express");
const app = express();

const connection = require('./database/database');

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");

const articleController = require('./articles/ArticlesController');
const categoriesController = require('./categories/CategoriesController');
const userController = require("./user/UserController");

// Conectando com o banco
connection
    .authenticate()
    .then(() => {
        console.log("Banco funcionando!")
    })
    .catch((err) => {
        console.log(err)
    });

app.use(articleController);
app.use(categoriesController);
app.use(userController);

// Fazendo o express usar o EJS como view engine
app.set('view engine', 'ejs');
// Definindo a pasta onde ficam os arquivos estaticos
app.use(express.static('public'));

// instalando o Body Parse OBS: Não precisa instalar a biblioteca do body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
//Home page
app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4 
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', { articles: articles, categories: categories })
        });
    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', { article: article, categories: categories })
            });
        } else {
            res.redirect("/");
        }
    }).catch(() => {
        res.redirect("/");
    });
});


app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }],
    }).then(category => {
        if (category != undefined) {

            Category.findAll().then(categories => {
                res.render('index', { articles: category.articles, categories: categories })
            })


        } else {
            res.redirect("/");
        }
    }).catch(() => {
        res.redirect("/");
    });
});

// Start do server na porta 8080
app.listen(8080, () => {
    console.log("Funcionando")
});