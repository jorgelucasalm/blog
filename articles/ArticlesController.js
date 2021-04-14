const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const adminAuth = require("../middleware/adminAuth");
const session = require("express-session");

router.use(session({
    secret: "qualquercoisa",
    cookie: {maxAge: 30000}
}))

router.use(express.urlencoded({ extended: true }));

router.get("/admin/articles", adminAuth,(req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("./admin/articles/index", { articles: articles });
    })

})

router.get("/admin/articles/new", adminAuth,(req, res) => {
    Category.findAll().then(categories => {
        res.render("./admin/articles/new", { categories: categories })
    })

});

router.post("/articles/save", adminAuth, (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles/new")
    });

});

router.post("/articles/delete", adminAuth,(req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            })
        } else {

            res.redirect("/admin/articles")
        }
    } else {
        res.redirect("/admin/articles")
    }
});

router.get("/admin/article/update/:id", adminAuth,(req, res) => {
    var id = req.params.id;
    Article.findOne({
        where: {
            id: id
        },
    }).then(article => {
        Category.findAll().then(categories => {
            res.render("./admin/articles/edit", { article: article, categories: categories })
        });
    })
});

router.post("/article/update", adminAuth,(req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }, {
        where: [{
            id: id
        }]
    }).then(() => {
        res.redirect("/admin/articles")
    })

});

router.get("/articles/page/:page", (req, res) => {
    var page = req.params.page;
    var offset = 0;
    // Numero de elementos que serao apresentados
    var limit = 4;

    // verificando se o parametro é valido 
    if (isNaN(page) || page == 1) {
        offset = 0;
    } else {
        // Passando o parametro para um numero
        offset = (parseInt(page) - 1) * 4
    }

    // Pegando todos os registros
    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {

        // Vendo se pode ou não ter outra pagina
        var next;
        if (offset + limit >= articles.count) {
            next = false;
        } else {
            next = true;
        }

        var result = {
            articles: articles,
            next: next,
            page: parseInt(page)
        }

        Category.findAll().then(categories => {

            res.render("admin/articles/page", { result: result, categories: categories });

        });

    });
})

module.exports = router;