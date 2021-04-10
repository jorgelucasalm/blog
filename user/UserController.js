const express = require("express");
const router = express.Router();
const User = require("./User")
const bcrypt = require("bcryptjs")

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/admin/users/create", (req, res) => {

    res.render("./admin/users/create")
});

router.post("/users/save", (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt)

    User.create({
        login: email,
        password: hash
    }).then(() => {
        res.redirect("/");
    }).catch((err)=>{
        res.redirect("/")
    })

});

module.exports = router;