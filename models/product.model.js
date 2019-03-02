//M part: Model
const mongoose = require("mongoose");
const hiddenFromGit_ImpInfo = require("../hiddenFromGit_ImpInfo");
const db_url = `mongodb+srv://${hiddenFromGit_ImpInfo.username}:${hiddenFromGit_ImpInfo.password}@cluster0-bxpre.mongodb.net/test?retryWrites=true`;
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'MongoDB connection error:'))

const Schema = mongoose.Schema;

let productSchema = Schema({
    name: {type: String, required: true, max: 180},
    price: {type: String, required: true, max:180}
});

//Export the model
module.exports = mongoose.model("Product", productSchema);