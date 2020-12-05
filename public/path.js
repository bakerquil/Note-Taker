const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);

    app.get("/api/notes", function (req, res) {
       res.json(notes);
    });
    app.post("/api/notes", function(req,res){
        let nNote = req.body
        notes.push(nNote);
        updatePLS();
    });
    app.get("/api/notes/:id", function(req,res){
        res.json(notes[req.params.id]);
    });
    app.delete("/api/notes/:id", function(req,res){
        notes.splice(req.params.id, 1);
        updatePLS();
    });
    app.get('/notes', function(req,res){
        res.sendFile(path.join(__dirname, "notes.html"));
    });
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname, "index.html"));
    });
    function updatePLS(){
        fs.writeFile("db/db.json",JSON.stringify(notes,`\t`), err => {
            if (err) throw err
            return true;
        });
    }
  });
};
