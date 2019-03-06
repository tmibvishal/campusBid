const express = require("express");
//const bodyParser = require("body-parser");
const expressLauout = require("express-ejs-layouts");
const database = require("./database/database");
const router = require("./routes/product.route");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("./config/localstrategy.passport")

// Initiating Express app
const app = express();

// Express Session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Set passport strategy
passport.use(localStrategy);

// Connect flash
app.use(flash());

// Global Variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

// EJS
app.use(expressLauout);
app.set("view engine", "ejs");

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Connect Database
database.connect();

// Routes
app.use("/users", require("./routes/users.routes"));
app.get("/", function(req,res){
    res.render("welcome");
});

//dedicating a port number and listening to that port
let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("Server is up and running on port " + port);
});
