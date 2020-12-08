const fs = require("fs");
const path = require("path");
  //found this way to export the app function so that i can use it in the server.js
module.exports = (app) => {
  fs.readFile("db/db.json", "utf8", function(err, res)  {
    if (err) throw err;
    console.log(err);
    let note = JSON.parse(res);

    app.get("/api/notes", function (req, res) {
      return res.json(note);
    });
    app.post("/api/notes", function(req,res){
        let nNote = req.body // the new note will be the body of the request 
        note.push(nNote); //pushes the newnote into the note array
        updatePLS();
    });
    app.get("/api/notes/:id", function(req,res){
        res.json(note[req.params.id]);
    });
    app.delete("/api/notes/:id", function(req,res){
        console.log(req);
        note.splice(req.params.id, 1);
        fs.writeFile("db/db.json", JSON.stringify(note), function(err){
            if (err) throw err
            return true;
        })
    });        //this will change the parth to the notes.html page
    app.get('/notes', function(req,res){
        res.sendFile(path.join(__dirname, "notes.html"));
    });                 // this will set the home or if an invalid param is provided to the index.html page
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname, "index.html"));
    }); // 
    function updatePLS(){
        fs.writeFile("db/db.json",JSON.stringify(note,`\t`), function(err) {
            console.log(err);
            if (err) throw err
            return true;
        });
    }
  });
};
