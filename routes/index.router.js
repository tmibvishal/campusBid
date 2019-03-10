const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');
const Product = require("../models/product.model");

router.get("/dashboard", ensureAuthenticated.ensureAuthenticated("/dashboard"), function (req, res) {

    Product.find({author: req.user._id}, {
        productName: 1,
        price: 1,
        imageLink: 1,
        category: 1
    }, function (err, products) {
        console.log(products);
        //user is logged in
        res.render("dashboard", {user: req.user, userName: req.user.name, products});
    });

});

router.get("/home", function (req, res) {
    res.redirect("/products");
});

module.exports = router;