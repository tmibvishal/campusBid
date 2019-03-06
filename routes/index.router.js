const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const ensureAuthenticated = require('../config/auth');

router.get("/dashboard",ensureAuthenticated.ensureAuthenticated ,function(req,res){
    res.render("dashboard", { user: req.user } );
});

module.exports = router;