const express = require("express");
const router = express.Router();
const metaphone = require('metaphone')
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');
const Product = require("../models/product.model");

/*
router.get("/test", controller.test);

router.get("/login", (req, res) => {
    console.log("Login")
});
router.get("/register", (req, res) => {
    console.log("Register")
});

router.post("/create", controller.product_create);
router.get("/:id", controller.product_details);
router.put("/:id/update", controller.product_update);
router.delete("/:id/delete", controller.product_delete);
*/

/*
    productName: {type: String, required: true, max: 180},
    author: {type: Schema.Types.ObjectId },
    metaphoneName: {type: String, required: true, max: 180},
    price: {type: Number, required: true},
    sellerEmail: {type: String},
    sellerPhone: {type: String, default: "Not Given by the User" , max: 10},
    imageLink: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String} ,
    technicalDetailsKey: [{type: String}],
    technicalDetailsValue: [{type: String}],
    commentsUser: [{type: String}],
    commentsMessage: [{type: String}],
    dateAdded: { type: Date, default: Date.now }
 */

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

module.exports = router;
