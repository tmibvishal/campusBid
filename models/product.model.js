const mongoose = require("mongoose");


const Schema = mongoose.Schema;

let productSchema = new Schema({
    productName: {type: String, required: true, max: 180},
    author: {type: Schema.Types.ObjectId },
    metaphoneName: {type: String, required: true, max: 180},
    price: {type: Number, required: true},
    sellerEmail: {type: String},
    sellerPhone: {type: String, default: "Not Given by the User" , max: 10},
    imageLink: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String} ,
    technicalDetailsKey: [{type: String}],
    technicalDetailsValue: [{type: String}],
    commentsUser: [{type: String}],
    commentsMessage: [{type: String}],
    dateAdded: { type: Date, default: Date.now }
});


//Export the model
module.exports = mongoose.model("Product", productSchema);