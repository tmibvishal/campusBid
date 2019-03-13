const express = require("express");
const router = express.Router();
const metaphone = require('metaphone')
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');
const Product = require("../models/product.model");

router.post("/getMetaphone", function (req, res) {
    let productName = req.body.productName;
    let description = req.body.description;
    let category = req.body.category;

    let toBeConsideredForSearch = productName + description + category;

    let metaphoneName = "";
    toBeConsideredForSearch.split(" ").forEach(function (word) {
        metaphoneName += metaphone(word) + " ";
    });

    res.send(metaphoneName);
});

router.post("/id/:id/addComment/", ensureAuthenticated.ensureAuthenticated("/products/"), function (req, res) {
    let productid = req.params.id;
    let userName = req.user.name;
    let redirectLink = "/products/id" + productid;
    let cmtMsg = req.body.commentMessage;
    console.log(cmtMsg);
    if(typeof cmtMsg == "undefined"){
        req.flash("error_msg", "Please write the proper comment message");
        res.redirect("/products/id/" + productid);
    }
    else if(cmtMsg == ""){
        req.flash("error_msg", "Please write the proper comment message");
        res.redirect("/products/id/" + productid);
    }
    else{
        console.log("Comment is adding");
        Product.updateOne({_id: productid}, {"$push": { commentsUser: userName, commentsMessage: cmtMsg}}, function(err){
            if(err){
                req.flash("error_msg", "Some error occured");
                res.redirect("/products/id/" + productid);

            }
            req.flash("success_msg", "Your comment saved succesfully");
            res.redirect("/products/id/" + productid);
        });
    }
});

router.post("/createProduct", ensureAuthenticated.ensureAuthenticated("/products/createProductPage"), function (req, res) {
    // assert: Category is only from the one given in the selector


    let errors = [];
    user = req.user;

    let CheckSharePhoneNumber = req.body.CheckSharePhoneNumber;
    let productName = req.body.productName;
    let price = req.body.price;
    let imageLink = req.body.imageLink;
    let description = req.body.description;
    let Category = req.body.Category;
    let technicalDetailsKey = req.body.technicalDetailsKey;
    let technicalDetailsValue = req.body.technicalDetailsValue;

    if (typeof(CheckSharePhoneNumber) == "undefined") {
        CheckSharePhoneNumber = "off";
    }

    if (!CheckSharePhoneNumber || !productName || !price || !imageLink || !description || !Category) {
        errors.push("Please fill in all the fields");
    }

    price = parseInt(price);
    if (isNaN(price)) errors.push("Please Enter a valid price");


    if (typeof technicalDetailsKey == "undefined") {
        technicalDetailsKey = [];
        technicalDetailsValue = [];
    }

    if (errors.length > 0) {
        res.render("createProductPage", {
            CheckSharePhoneNumber,
            productName,
            price,
            imageLink,
            description,
            errors,
            user
        });
    }
    else {
        let toBeConsideredForSearch = productName + description + Category;
        let metaphoneName = "";
        toBeConsideredForSearch.split(" ").forEach(function (word) {
            metaphoneName += metaphone(word) + " ";
        });
        let product = new Product({
            productName: productName,
            author: user._id,
            metaphoneName: metaphoneName,
            price: parseInt(price),
            sellerEmail: user.email,
            sellerPhone: ((CheckSharePhoneNumber == "on") ? user.phone : ""),
            imageLink: imageLink,
            description: description,
            category: Category,
            technicalDetailsKey: ((typeof technicalDetailsKey == "string") ? [technicalDetailsKey] : technicalDetailsKey),
            technicalDetailsValue: ((typeof technicalDetailsValue == "string") ? [technicalDetailsValue] : technicalDetailsValue),
            commentsUser: [],
            commentsMessage: []
        });
        product.save(function (err, product) {
            if (err) {
                errors.push(err);
                res.render("createProductPage", {
                    CheckSharePhoneNumber,
                    productName,
                    price,
                    imageLink,
                    description,
                    errors,
                    user
                });
            }
            req.flash("success_msg", "You have succesfully created the product");
            res.redirect("/products/id/" + product._id);
        });
    }

});


router.post("/delete", ensureAuthenticated.ensureAuthenticated(),function (req, res) {
    let productId = req.body.productId;
    let user = req.user;
    Product.findById(productId, function (err, product){
        console.log(product.author + " "  + user._id);

        if(product.author == user._id || user._id == "5c84bf99f5af921e2d1c417e"){ //only author or the admin can remove the product
            product.remove(function(err){
                if(err){
                    req.flash("error_msg", "Some error occured while removeing this product. Try Again")
                    res.redirect("/dashboard");
                    return;
                }
                req.flash("success_msg", "You successfully deleted the product.")
                res.redirect("/dashboard");
            });
        }

        else{
            req.flash("error_msg", "You are Trying to Remove a product that is not yours.")
            res.redirect("/dashboard");
        }
    });
});


// Home
router.get("/", function (req, res) {
    let user = req.user;
    Product.find({}, {productName: 1, price: 1, imageLink: 1, category: 1}, function (err, products) {
        if (!user) {
            res.render("products", {products});
        }
        else {
            //user is logged in
            res.render("products", {"userName": user.name, products});
        }
    });
});


router.get("/category/:categoryQuery", function (req, res) {
    let categoryQuery = req.params.categoryQuery;

    user = req.user;

    if (categoryQuery == "Stationery") {
        Product.find({$or : [{category: "Calculators"},{category: "Other Stationery Items"}]}, {
            productName: 1,
            price: 1,
            imageLink: 1,
            category: 1
        }, function (err, products) {

            if (!user) {
                res.render("products", {products});
            }
            else {
                //user is logged in
                res.render("products", {"user": user.name, products});
            }
        });
    }
    else if (categoryQuery == "Electronics") {
        Product.find({$or : [{category: "Computers"},{category: "Laptops"},{category: "Computer Accessories"},{category: "Mobile Phones"},{category: "Tablets"},{category: "Mobile Accessories"},{category: "Speakers"},{category: "Other Electronic Items"}]}, {
            productName: 1,
            price: 1,
            imageLink: 1,
            category: 1
        }, function (err, products) {

            if (!user) {
                res.render("products", {products});
            }
            else {
                //user is logged in
                res.render("products", {"user": user.name, products});
            }
        });
    }
    else if (categoryQuery == "Furniture & Decor") {
        Product.find({$or : [{category: "Furniture"},{category: "Desk Accessories"},{category: "Paintings"},{category: "Other Furniture Items"}]}, {
            productName: 1,
            price: 1,
            imageLink: 1,
            category: 1
        }, function (err, products) {

            if (!user) {
                res.render("products", {products});
            }
            else {
                //user is logged in
                res.render("products", {"user": user.name, products});
            }
        });
    }
    else {
        Product.find({category: categoryQuery}, {
            productName: 1,
            price: 1,
            imageLink: 1,
            category: 1
        }, function (err, products) {

            if (!user) {
                res.render("products", {products});
            }
            else {
                //user is logged in
                res.render("products", {"user": user.name, products});
            }
        });
    }


});


router.get("/search", function (req, res) {
    let searchQuery = metaphone(req.query.searchQuery);

    //console.log(searchQuery);

    user = req.user;
    Product.find({metaphoneName: {$regex: `.*${searchQuery}.*`}}, {
        productName: 1,
        price: 1,
        imageLink: 1,
        category: 1
    }, function (err, products) {

        if (!user) {
            res.render("products", {products});
        }
        else {
            //user is logged in
            res.render("products", {"user": user.name, products});
        }
    });
});

router.get("/createProductPage", ensureAuthenticated.ensureAuthenticated("/products/createProductPage"), function (req, res) {
    let user = req.user;
    res.render("createProductPage", {user});

});

router.get("/id/:id", function (req, res) {

    let user = req.user;

    Product.findById(req.params.id, function (err, product) {
        if (err) {
            res.send("This product does not exists!!");
            return;
        }
        if (!user) {
            res.render("singleProductPage", {product});
        }
        else {
            //user is logged in
            res.render("singleProductPage", {"userName": user.name, product});
        }
    });

});


module.exports = router;
