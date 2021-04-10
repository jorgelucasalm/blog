const express = require("express");
const router = express.Router();
const User = require("./User")
const bcrypt = require("bcryptjs")

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/admin/users/new", (req, res) => {
    res.render("./admin/users/create")
});

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("./admin/users/index", {users: users})
    })
});

router.post("/users/save", (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;

    User.findOne({
        where: {
            login: email
        }
    }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(pass, salt)

            User.create({
                login: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/")
            })
        } else {
            res.redirect("/admin/users/create")
        }
    })
});

router.post("/user/delete", (req, res)=>{
    var id = req.body.id;

    User.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/users")
    })
})

module.exports = router;