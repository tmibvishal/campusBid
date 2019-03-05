//app.js: This initiates the server

const express = require("express");
//const bodyParser = require("body-parser");
const expressLauout = require("express-ejs-layouts");
const database = require("./database/database");

//initiating the express app
const app = express();

//settings the view engine to egs
app.use(expressLauout);
app.set("view engine", "ejs");

//making the connection to the database
database.connect();

// Imports routes for the products
const router = require("./routes/product.route");

//now bodyparser is a part of express
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/users", require("./routes/users.routes"));
app.get("/", function(req,res){
    res.render("welcome")
})

//dedicating a port number and listening to that port
let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("Server is up and running on port " + port);
})
