const express = require("express");
const app = express();
const bodyParse = require("body-parser");

const connection = require('./database/database')

const article = require("./articles/Article")
const category = require("./categories/Category")

const articleController = require('./articles/ArticlesController')
const categoriesController = require('./categories/CategoriesController')

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
app.use(express.static('public'))

// instalando o Body Parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
//Home page
app.get("/", (req, res) => {
    res.render('index')
})

// Start do server na porta 8080
app.listen(8080, () => {
    console.log("Funcionando")
})