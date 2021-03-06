const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const User = require("../models/users.model");
const Product = require("../models/product.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const passport = require("passport");

router.get("/", (req, res) => {
    res.render("welcome")
});

// Login Page
router.get("/login", (req, res) => {
    res.render("login")
});

// Register Page
router.get("/register", (req, res) => {
    res.render("registerUser")
});

// Login Handle
router.post("/login", (req, res, next) => {
    let redirectLink = req.flash("redirectLink");

    link = (redirectLink.length == 0)?"/dashboard":redirectLink[0];

    passport.authenticate("local", {
        successRedirect: link,
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);

});

// Logout Handle
router.get("/logout" ,(req, res, next) => {
    req.logout();
    req.flash("success_msg", "You are successfully logged out");
    res.redirect("login");
});

// Register Handle
router.post("/register", (req, res) => {
    const {name, email, userPhone, password, password2} = req.body;
    let errors = [];

    // checking if all fields are filled
    if (!name || !email || !userPhone || !password || !password2) errors.push("Please fill in all the fields");
    // checking if the 2 passwords match
    if (password != password2) errors.push("Passwords do not match");
    // checking the the password length is atleast 6 characters
    if (password.length < 6) errors.push("Password must be atleast 6 characters long");
    if (parseInt(userPhone)==NaN || userPhone.length!=10 ) errors.push("Please Enter a valid phone number");

    if (errors.length > 0) {
        res.render("registerUser", {name, email, userPhone, password, password2, errors})
    }
    else {
        User.findOne({email}, function (err, user) {
            if (err) {
                errors.push("Some Error Occured!");
                res.render("registerUser", {name, email, userPhone, password, password2 ,errors});
                return;
            }
            //Checking if the email is already exists
            if (user) {
                errors.push("Email id already exists");
                res.render("registerUser", {name, email, userPhone, password, password2 , errors});
            }
            else {
                const user = new User({name, email, userPhone, password});
                bcrypt.hash(user.password, saltRounds, function (err, hash) {
                    user.password = hash;
                    user.save().then(function (user) {
                        //console.log("Succesfully saved to the database");
                        req.flash("success_msg", "You are registered and can now log in..");
                        res.redirect("/users/login");
                    })
                });
            }
        });
    }
});

//User profile
router.get("/id/:id", (req, res) => {
    let errors = []
    userId = req.params.id;
    User.findById(userId, function (err, user) {
        if (err) {
            errors.push("User Does Not Exists");
            res.render("userProfile", {errors});
            return;
        }

        Product.find({author: userId}, {
            productName: 1,
            price: 1,
            imageLink: 1,
            category: 1
        }, function (err, products) {
            //user is logged in
            if(err){
                errors.push("There is some error");
                res.render("userProfile", {user, errors});
                return;
            }
            res.render("userProfile", {user, products});
        });


    });
});

module.exports = router;
