//M part: Model
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    userPhone: {type: String, default: "Not Given by the User" , max: 10},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
});

//Export the model
module.exports = mongoose.model("User", userSchema);