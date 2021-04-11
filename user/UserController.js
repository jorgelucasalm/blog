const express = require("express");
const router = express.Router();
const User = require("./User")
const bcrypt = require("bcryptjs")
const session = require("express-session");


router.use(session({
    secret: "qualquercoisa",
    cookie: {maxAge: 30000}
}))
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/admin/users/new", (req, res) => {
    res.render("./admin/users/create")
});

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("./admin/users/index", { users: users })
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

router.post("/user/delete", (req, res) => {
    var id = req.body.id;

    User.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/users")
    })
})

router.get("/login", (req, res) => {
    res.render("admin/users/login");
})

router.post("/authenticate", (req, res) => {
    var login = req.body.login;
    var pass = req.body.pass;

    User.findOne({
        where: {
            login: login,
        }
    }).then(user => {
        if (user != undefined) {
            var correct = bcrypt.compareSync(pass, user.password);
            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.login
                };
                res.json(req.session.user);
            } else {
                res.redirect("/login")
            }
        } else {
            res.redirect("/login")
        }
    })
})


module.exports = router;