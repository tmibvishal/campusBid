const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.get("/", (req,res) => {res.render("welcome")});

//Login Page
router.get("/login", (req,res) => {res.render("login")});

//Register Page
router.get("/register", (req,res)=>{res.render("registerUser")});



module.exports = router;
