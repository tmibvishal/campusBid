//app.js: This initiates the server

const express = require("express");
const bodyParser = require("body-parser");
//initiating the express app
const app = express();

//dedicating a port number and listening to that port
let port = 5000;
app.listen(port, function(){
    console.log("Server is up and running on port " + port);
})