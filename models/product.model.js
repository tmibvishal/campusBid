//M part: Model
const mongoose = require("mongoose");
const hiddenFromGit_ImpInfo = require("../hiddenFromGit_ImpInfo");

const Schema = mongoose.Schema;



let productSchema = Schema({
    name: {type: String, required: true, max: 180},
    price: {type: String, required: true, max:180}
});

//Export the model
module.exports = mongoose.model("Product", productSchema);