const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');
const Product = require("../models/product.model");

router.get("/dashboard",ensureAuthenticated.ensureAuthenticated ,function(req,res){
    res.render("dashboard", { user: req.user } );
});

router.get("/home" ,function(req,res){
    res.redirect("/products");
});

module.exports = router;