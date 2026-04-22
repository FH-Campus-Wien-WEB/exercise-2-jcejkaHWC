const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// server/server.js
app.get('/movies', function (req, res) {
  // Task 1.2: Wandelt das Objekt-Modell in ein Array um
  const movieArray = Object.values(movieModel);
  res.json(movieArray);
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const movie = movieModel[req.params.imdbID];
  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});

// Task 3.1 & 3.2: Änderungen speichern (Update oder Create)
app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const movieData = req.body;
  const exists = !!movieModel[imdbID];

  movieModel[imdbID] = movieData; // Speichert die Daten im RAM

  if (exists) {
    res.sendStatus(200); // Task 3.1
  } else {
    res.status(201).json(movieData); // Task 3.2: Status 201 + Objekt zurückschicken
  }
});

app.listen(3000);
console.log("Server now listening on http://localhost:3000/");


