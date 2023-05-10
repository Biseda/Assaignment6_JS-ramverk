import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function MovieList() {
  // Tillstånd för att lagra listan med filmer, titeln på en ny film, betyget på en ny film och sorteringsordningen
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState(null);

  // Funktion för att lägga till en film i listan
  function addMovieToList(event) {
    event.preventDefault();
    if (!title || !rating) {
      alert("Både titel och betyg måste fyllas i.");
      return;
    }

    // Skapa en kopia av den befintliga listan med filmer
    const updatedMovies = [...movies];
    // Lägg till den nya filmen i kopien
    updatedMovies.push({
      title: title,
      rating: rating
    });

    // Uppdatera listan med filmer och rensa inputfälten för titel och betyg
    setMovies(updatedMovies);
    setTitle("");
    setRating("");
  }

  // Funktion för att ta bort en film från listan
  function deleteMovie(title) {
    // Skapa en ny lista med filmer som filtrerar bort den film med matchande titel
    const updatedMovies = movies.filter(movie => movie.title !== title);
    // Uppdatera listan med filmer
    setMovies(updatedMovies);
  }

  // Funktion för att sortera filmer efter titel i alfabetisk ordning
  function sortMoviesByTitle() {
    // Skapa en kopia av listan med filmer och sortera den efter titel
    const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    // Uppdatera listan med sorterade filmer och ange sorteringsordningen som "title"
    setMovies(sortedMovies);
    setSortBy("title");
  }

  // Funktion för att sortera filmer efter betyg i fallande ordning
  function sortMoviesByRating() {
    // Skapa en kopia av listan med filmer och sortera den efter betyg
    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
    // Uppdatera listan med sorterade filmer och ange sorteringsordningen som "rating"
    setMovies(sortedMovies);
    setSortBy("rating");
  }

  return (
    <div className="container">
      <h1>Min filmlista</h1>
      <form onSubmit={addMovieToList}>
        <div className="form-group">
          <legend>Lägg till en film</legend>
          <label>
            Titel:
            <input
              type="text"
              className="form-control"
              placeholder="Titel här..."
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Betyg:
            <select
              className="form-control"
              value={rating}
              onChange={event => setRating(event.target.value)}
            >
              <option value="0">Välj betyg här...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-success mt-2">Lägg till film</button>
      </form>
      <ul className="list-group mt-2">
        {movies.length > 0 && <h2>Inlagda filmer</h2>}
        {/* Loopa igenom varje film i listan och rendera en li för varje film */}
        {movies.map(movie => (
          <li key={movie.title} className="list-group-item d-flex align-items-center justify-content-between">
            <div>
              {movie.title}
            </div>
            <div className="d-flex align-items-center">
              {/* Rendera stjärnor baserat på filmens betyg */}
              {Array.from({ length: parseInt(movie.rating) }, (_, index) => (
                <img
                  key={index}
                  src="images/star.png"
                  alt="Star"
                  style={{ width: '35px', height: '35px', marginRight: '2px' }}
                />
              ))}
              {/* Rendera en bild för att ta bort filmen */}
              <img
                src="images/delete.png"
                alt="Delete movie"
                style={{ width: '45px', height: '45px', marginLeft: '3px' }}
                onClick={() => deleteMovie(movie.title)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {/* Knapp för att sortera filmer efter titel */}
        <button
          className={`btn btn-primary mx-2 ${sortBy === "title" ? "active" : ""}`}
          onClick={sortMoviesByTitle}
        >
          Alfabetisk ordning
        </button>
        {/* Knapp för att sortera filmer efter betyg */}
        <button
          className={`btn btn-primary mx-2 ${sortBy === "rating" ? "active" : ""}`}
          onClick={sortMoviesByRating}
        >
          Betygsordning
        </button>
      </div>
    </div>
  );
}

export default MovieList;