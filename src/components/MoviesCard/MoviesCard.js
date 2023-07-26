import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import durationCalculate from "../../utils/durationCalculate";
// import { moviesUrl } from "../../utils/constants";

export default function MoviesCard({ movie, savedMovies, handleSaveMovie, handleUnsaveMovie }) {
  let location = useLocation();

  const isSaveButton = location.pathname === "/movies";
  const isUnsafeButton = location.pathname === "/saved-movies";
  let movieDuration = durationCalculate(movie.duration);
  let movieImage = movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image;

  const isSaved = savedMovies ? savedMovies.some((i) => i.movieId === movie.id) : false;
  const idSaved = savedMovies ? savedMovies.find((i) => i.movieId === movie.id) : null;

  function handleSaveClick() {
    handleSaveMovie(movie, isSaved, idSaved);
  }

  function handleUnsaveClick() {
    handleUnsaveMovie(movie);
  }

  return (
    <article className="card">
      <a href={movie.trailerLink} target="_blanc" className={isUnsafeButton ? "card__image-link_saved" : "card__image-link"}>
        <img className="card__image" src={movieImage} alt={movie.nameRU} />
      </a>
      {isUnsafeButton && <button
        className="card__unsave-button"
        onClick={handleUnsaveClick}
        type="button"
      ></button>}
      {isSaveButton && <button
        className={isSaved ? "card__save-button_saved" : "card__save-button"}
        onClick={handleSaveClick}
        type="button">
        {isSaved ? "" : "Сохранить"}</button>}
      <div className="card__text-container">
        <h3 className="card__title">{movie.nameRU}</h3>
        <p className="card__duration">{movieDuration}</p>
      </div>
    </article>
  )
}