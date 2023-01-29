const express = require('express');
const router = express.Router();
const fs = require("fs")
const path = require('path');
const dbFileName = path.join(__dirname, "../db/db.json");

router.get("/", (req, res) => {
  fs.readFile(dbFileName, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("err");
      throw err;
    } else {
      const noteData = JSON.parse(data);
      res.json(noteData);
    }
  });
});

router.post("/", (req, res) => {
    fs.readFile(dbFileName, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("oh no!");
      throw err;
    } else {
      const noteData = JSON.parse(data);
      req.body.id = noteData.length + 1
      noteData.push(req.body);
      fs.writeFile(dbFileName, JSON.stringify(noteData, null, 4), (err) => {
        if (err) {
          res.status(500).send("err");
          throw err;
        } else {
          res.send("data added!");
        }
      });
    }
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(dbFileName, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("oh no!");
      throw err;
    } else {
      const noteData = JSON.parse(data);
      for (let i = 0; i < noteData.length; i++) {
        const note = noteData[i];
        if (note.id == req.params.id) {
          return res.json(note);
        }
      }
      return res.send("next note");
    }
  });
});

router.delete("/:id", (req, res) => {
  fs.readFile(dbFileName, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("error occurred!");
      throw err;
    } else {
      const noteData = JSON.parse(data);
      for (let i = 0; i < noteData.length; i++) {
        const note = noteData[i];
        if (note.id == req.params.id) {
          noteData.splice(i,1)
          fs.writeFile(dbFileName, JSON.stringify(noteData, null, 4), (err) => {
            if (err) {
              res.status(500).send("err");
              throw err;
            }
          });
          return res.json(note);
        }
      }
    }
  });
});



  module.exports = router;