const hiddenFromGit_ImpInfo = require("../hiddenFromGit_ImpInfo");
const mongoose = require("mongoose");

function connect(){
    const db_url = `mongodb+srv://${hiddenFromGit_ImpInfo.username}:${hiddenFromGit_ImpInfo.password}@cluster0-bxpre.mongodb.net/campusBid?retryWrites=true`;
    let mongoDB = process.env.MONGODB_URI || db_url;
    mongoose.connect(mongoDB, {useNewUrlParser: true}).then(()=>console.log("MongoDb Connected"));
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on("error", console.error.bind(console, 'MongoDB connection error:'))
}

module.exports = {
    connect
}