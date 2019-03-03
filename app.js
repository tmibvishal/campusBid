//app.js: This initiates the server

const express = require("express");
const bodyParser = require("body-parser");

//initiating the express app
const app = express();

//settings the view engine to egs
app.set("view engine", "ejs");

//making the connection to the database
const database = require("./database/database");
database.connect();

// Imports routes for the products
const router = require("./routes/product.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/products", router);
app.get("/", function(req,res){
    res.render("index", {"name": "vishal"})
})

//dedicating a port number and listening to that port
let port = 5000;
app.listen(port, function(){
    console.log("Server is up and running on port " + port);
})
