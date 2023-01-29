const express = require("express");
const path = require('path');
const app = express();
const fs = require ("fs");


const PORT = process.env.PORT || 3001;

//app.use(express.static(__dirname + 'public'));
app.use(express.static(path.join(__dirname, "./public")));
console.log(path.join(__dirname, "./public/index.html"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const noteRoutes = require("./controllers/notesController.js")
app.use("/api/notes",noteRoutes)


app.listen(PORT, function () {
    console.log("v2. listening on port " + PORT );
});


