const express = require("express");
const router = express.Router();
const User = require("./User")
const bcrypt = require("bcryptjs")

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/admin/users/create", (req, res) => {

    res.render("./admin/users/create")
});


module.exports = router;