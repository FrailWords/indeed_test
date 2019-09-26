const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

//Static file declaration
app.use(express.static(path.join(__dirname, 'exam_app/build')));

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}

app.use(ignoreFavicon);

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require("fs");

const adapter = new FileSync('db.json')
const db = low(adapter)

db._.mixin({
  withoutAnswers: function(array) {
    array.forEach(function(v){ delete v['correct answer'] });
    return array;
  }
});

const questionsDirectory = path.join(__dirname, 'questions');

const class10Questions = JSON.parse(fs.readFileSync(questionsDirectory+"/class10.json"))
db.set('questions', class10Questions).write();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/questions', function (req, res) {
  res.send(db.get('questions')
      .withoutAnswers()
      .value())
})

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'exam_app/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/exam_app/build/index.html'))
})

//Start server
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`)
});

