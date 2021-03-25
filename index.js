const express = require("express");
const app = express();
const bodyParse = require("body-parser");

const connection = require('./database/database')

const articleController = require('./articles/ArticlesController')
const categoriesController = require('./categories/CategoriesController')

// Fazendo o express usar o EJS como view engine
app.set('view engine', 'ejs');
// Definindo a pasta onde ficam os arquivos estaticos
app.use(express.static('public'))

app.use(articleController);
app.use(categoriesController);

connection.authenticate().then(()=>{
    console.log("Banco funcionando!")
}).catch((err)=>{
    console.log(err)
})

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