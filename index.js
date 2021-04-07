const express = require("express");
const app = express();

const connection = require('./database/database');

const Article = require("./articles/Article");
const Category = require("./categories/Category");

const articleController = require('./articles/ArticlesController');
const categoriesController = require('./categories/CategoriesController');

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
    Article.findAll().then(articles => {
        res.render('index', { articles: articles })
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
            res.render("article", { article: article });
        } else {
            res.redirect("/");
        }
    }).catch(()=>{
        res.redirect("/");
    });
});

// Start do server na porta 8080
app.listen(8080, () => {
    console.log("Funcionando")
});