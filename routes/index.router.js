const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');
const Product = require("../models/product.model");

router.get("/dashboard",ensureAuthenticated.ensureAuthenticated ,function(req,res){
    res.render("dashboard", { user: req.user } );
});

router.get("/home" ,function(req,res){
    let user = req.user;
    Product.find({}, {productName:1, price:1, imageLink:1, category:1}, function (err,products){
        if(!user){
            res.render("home", {products});
        }
        else{
            //user exists
            res.render("home", { user: req.user, products} );
        }
    });




});

module.exports = router;