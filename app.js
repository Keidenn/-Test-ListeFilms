const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'sample_mflix';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route pour afficher le formulaire
app.get('/', (req, res) => {
  res.render('form.ejs');
});

// Route pour gérer l'envoi du formulaire
app.post('/addmovie', async (req, res) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection('movies');

      // Convertit les chaînes actors et genres en tableaux
      const movieData = {
        ...req.body,
        actors: req.body.actors.split(',').map(actor => actor.trim()), // Supprime les espaces superflus
        genres: req.body.genres.split(',').map(genre => genre.trim())
      };

      const movie = await col.insertOne(movieData);
      res.send('Film ajouté avec succès');
    } catch (err) {
      console.log(err);
      res.send('Erreur lors de l\'ajout du film');
    } finally {
      await client.close();
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Route pour afficher tous les films
app.get('/movies', async (req, res) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('movies');

      // Récupère tous les films
      const movies = await collection.find({}).toArray();

      // Passe les films à la vue pour affichage
      res.render('movies.ejs', { movies });
    } catch (err) {
      console.log(err);
      res.send('Erreur lors de la récupération des films');
    } finally {
      await client.close();
    }
  });
