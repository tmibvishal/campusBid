const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

router.get("/", (req,res) => {res.render("welcome")});

//Login Page
router.get("/login", (req,res) => {res.render("login")});

//Register Page
router.get("/register", (req,res)=>{res.render("registerUser")});

//Register to database
router.post("/register", (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    // checking if all fields are filled
    if(!name || !email || !password || !password2) errors.push("Please fill in all the fields");
    // checking if the 2 passwords match
    if(password != password2) errors.push("Passwords do not match");
    // checking the the password length is atleast 6 characters
    if(password.length < 6) errors.push("Password must be atleast 6 characters long");

    if(errors.length > 0){
        res.render("registerUser", { name, email, errors })
    }
    else{
        User.findOne({email}, function(err, user){
            if(err){
                console.log(err);
                return;
            }
            //Checking if the email is already exists
            if(user){
                errors.push("Email id already exists");
                res.render("registerUser", {name, email, errors})
            }
            else{
                const user = new User({name, email, password});
                bcrypt.hash(user.password ,saltRounds, function(err, hash){
                    user.password = hash;
                    user.save().then(function(user){
                        //console.log("Succesfully saved to the database");
                        req.flash("success_msg", "You are registered and can now log in..")
                        res.redirect("/users/login");
                    })
                });
            }
        });
    }


})

module.exports = router;
