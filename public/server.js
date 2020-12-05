const express = require ("express");
const fs = require("fs");
const path = require("path");
let savedNotes = require("../db/db.json")

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use(express.static("public"))
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "notes.html"))
})

app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/api/notes", function(req,res){
    
   return res.json(savedNotes)
})
app.post("/api/notes",function(req,res){
    savedNotes.push(req.body);
})


app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT)
})

 