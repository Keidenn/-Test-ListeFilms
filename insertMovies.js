const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function insertMovies() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    const moviesToInsert = [
        { title: "The Matrix", year: 1999, director: "Lana Wachowski, Lilly Wachowski", actors: ["Keanu Reeves", "Laurence Fishburne"], genres: ["Action", "Sci-Fi"], img: "https://fr.web.img6.acsta.net/medias/04/34/49/043449_af.jpg" },
        { title: "Inception", year: 2010, director: "Christopher Nolan", actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"], genres: ["Action", "Adventure", "Sci-Fi"], img: "https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF1000,1000_QL80_.jpg" },
        { title: "Interstellar", year: 2014, director: "Christopher Nolan", actors: ["Matthew McConaughey", "Anne Hathaway"], genres: ["Adventure", "Drama", "Sci-Fi"], img: "https://fr.web.img6.acsta.net/pictures/14/09/24/12/08/158828.jpg" },
        { title: "Fight Club", year: 1999, director: "David Fincher", actors: ["Brad Pitt", "Edward Norton"], genres: ["Drama"], img: "https://m.media-amazon.com/images/I/71wvsHoHLFL._AC_UF350,350_QL50_.jpg" },
        { title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", actors: ["John Travolta", "Uma Thurman"], genres: ["Crime", "Drama"], img: "https://m.media-amazon.com/images/S/pv-target-images/dbb9aff6fc5fcd726e2c19c07f165d40aa7716d1dee8974aae8a0dad9128d392.jpg" },
        { title: "Forrest Gump", year: 1994, director: "Robert Zemeckis", actors: ["Tom Hanks", "Robin Wright"], genres: ["Drama", "Romance"], img: "https://fr.web.img4.acsta.net/pictures/15/10/13/15/12/514297.jpg" },
        { title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont", actors: ["Tim Robbins", "Morgan Freeman"], genres: ["Drama"], img: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" },
        { title: "The Godfather", year: 1972, director: "Francis Ford Coppola", actors: ["Marlon Brando", "Al Pacino"], genres: ["Crime", "Drama"], img: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
        { title: "The Dark Knight", year: 2008, director: "Christopher Nolan", actors: ["Christian Bale", "Heath Ledger"], genres: ["Action", "Crime", "Drama"], img: "https://fr.web.img2.acsta.net/medias/nmedia/18/63/97/89/18949761.jpg" },
        { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, director: "Peter Jackson", actors: ["Elijah Wood", "Ian McKellen"], genres: ["Adventure", "Drama", "Fantasy"], img: "https://m.media-amazon.com/images/S/pv-target-images/beecd85c0063bd86eec77ab74b0b1b952495e1799401ec1ddbc2b4257510213a.jpg" },
        { title: "Jurassic Park", year: 1993, director: "Steven Spielberg", actors: ["Sam Neill", "Laura Dern", "Jeff Goldblum"], genres: ["Adventure", "Sci-Fi", "Thriller"], img: "https://fr.web.img4.acsta.net/pictures/20/07/21/16/53/1319265.jpg"},
        { title: "Back to the Future", year: 1985, director: "Robert Zemeckis", actors: ["Michael J. Fox", "Christopher Lloyd"], genres: ["Adventure", "Comedy", "Sci-Fi"], img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Back_to_the_Future.jpg/220px-Back_to_the_Future.jpg" }
      ];

    const result = await movies.insertMany(moviesToInsert);
    console.log(`${result.insertedCount} movies were inserted`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

insertMovies();
