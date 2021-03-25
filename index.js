const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const connection = require("./database/database")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

// Database
// Chamando o objeto de database.js e verificando se ele esta conectado
connection
    .authenticate()
    .then(() => {
        console.log("Servidor conectado")
    })
    .catch((error) => {
        console.log(error)
    });

app.use("/", categoriesController);
app.use("/", articlesController);

// Fazendo o express usar o EJS como view engine
app.set('view engine', 'ejs');
// Definindo a pasta onde ficam os arquivos estaticos
app.use(express.static('public'))

// instalando o Body Parse
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// Rotas
//Home page
app.get("/", (req, res) => {
    res.render('index')
})

// Start do server na porta 8080
app.listen(8080, () => {
    console.log("Funcionando")
})