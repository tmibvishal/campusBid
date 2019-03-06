const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

//User Model
const User = require("../models/users.model");

let localStrategy = new LocalStrategy(function(email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err) return;
        //check user
        if(!user){
            return done(null, false, {message: "Email id not registered"});
            // done(error, user, message object)
        }
        else{
            //check password
            bcrypt.compare(password, user.password, function(err, passwordIsCorrect){
                if(!passwordIsCorrect){
                    return done(null, false, {message: "Password is incorrect"});
                }
                else{
                    return done(null, user);
                }
            })
        }

    });
});

module.exports = localStrategy;