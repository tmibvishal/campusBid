const express = require("express");
const router = express.Router();
const metaphone = require('metaphone')
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');
const Product = require("../models/product.model");

router.post("/createProduct",   function (req, res) {
    // assert: req.body.price is a number like "10"

    let productName = req.body.productName;
    let description = req.body.description;
    let category = req.body.category;

    let product = new Product({
        productName: productName,
        author: "5c7e7524d00094fb16510940",
        metaphoneName: metaphone(productName + description + category),
        price: parseInt(req.body.price),
        sellerEmail: req.body.email,
        sellerPhone: req.body.phone,
        imageLink: req.body.imageLink,
        description: description,
        category: category,
        technicalDetailsKey: ["Brand","Series","Colour","Item Height","Item Width","Screen Size","Maximum Display Resolution"],
        technicalDetailsValue: ["Microsoft","Surface Laptop 2","Platinum","15 Millimeters","22.3 Centimeters","13.5 Inches","2256 X 1504"],
        commentsUser: ["vishal","drtechNNo"],
        commentsMessage: ["Great Book","Visit \"drtechNNo\" on YouTube for Microsoft vs Apple videos\n" +
        "\n" +
        "Microsoft has been the underdog in hardware to Apple.\n" +
        "But I have been using surface pro devices since first gen surface pro.\n" +
        "They are great devices offer incredible performance and optimisation.\n" +
        "Initial models had few hiccups but now it's supremely refined.\n" +
        "But it's very hard to recommend or buy a128gb SSD laptop in 2019.\n" +
        "A request to beloved Microsoft, please do not follow poor trends started by Apple.\n" +
        "They are now dying because of this attitude to extract most money with least hardware.\n" +
        "SSD prices are taking down fast and this size ssd is just unimaginable in 2019."]
    });

    product.save(function (err) {
        if (err) {
            throw err;
        }
        res.send("You have successfully created user: " + req.body.name + " \nwith price: " + req.body.price)
    });
});

// Home
router.get("/" ,function(req,res){
    let user = req.user;
    Product.find({}, {productName:1, price:1, imageLink:1, category:1}, function (err,products){
        if(!user){
            res.render("products", {products});
        }
        else{
            //user is logged in
            res.render("products", { "user": user.name, products} );
        }
    });
});

module.exports = router;
