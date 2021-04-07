const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.use(express.urlencoded({ extended: true }));

router.get("/admin/articles/new", (req, res)=>{
    Category.findAll().then(categories=>{
        res.render("./admin/articles/new", {categories: categories})
    })
    
});

router.post("/articles/save", (req, res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category  
    }).then(()=>{
        res.redirect("/admin/articles/new")
    });
    
});

module.exports = router;