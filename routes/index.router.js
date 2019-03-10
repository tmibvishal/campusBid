const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');
const Product = require("../models/product.model");

router.get("/dashboard", ensureAuthenticated.ensureAuthenticated("/dashboard"), function (req, res) {

    let userId = req.user._id;
    if (userId == "5c84bf99f5af921e2d1c417e") {
        //ie user is admin
        Product.find({}, {
            productName: 1,
            price: 1,
            sellerEmail:1,
            imageLink: 1,
            category: 1
        }, function (err, products) {
            console.log(products);
            //user is logged in
            res.render("dashboard", {user: req.user, userName: req.user.name, products});
        });
    }
    else {
        //normal user
        Product.find({author: userId}, {
            productName: 1,
            price: 1,
            imageLink: 1,
            category: 1
        }, function (err, products) {
            //user is logged in
            res.render("dashboard", {user: req.user, userName: req.user.name, products});
        });
    }



});

router.get("/", function (req, res) {
    res.redirect("/products");
});

router.get("/home", function (req, res) {
    res.redirect("/products");
});

module.exports = router;