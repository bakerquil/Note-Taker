const express = require("express");
const fs = require("fs");
// requires fs because of importing from path.js
const path = require("path");

// sets app to use express
const app = express();
// will run on local port 3000 and heroku for testing
const PORT = process.env.PORT||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./public/path')(app)
// calls the path.js file and passes it express
app.listen(PORT, function(){
    console.log("listening on PORT:" + PORT)
})