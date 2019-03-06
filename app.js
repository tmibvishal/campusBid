const express = require("express");
//const bodyParser = require("body-parser");
const expressLauout = require("express-ejs-layouts");
const database = require("./database/database");
const router = require("./routes/product.route");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("./config/localstrategy.passport")
const User = require("./models/users.model");


// Initiating Express app
const app = express();

// Express Session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done){
    done(null, user.id)
});
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});
passport.use(localStrategy);

// Connect flash
app.use(flash());

// Global Variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

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
app.use("/", require("./routes/index.router"));
//dedicating a port number and listening to that port
let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("Server is up and running on port " + port);
});
