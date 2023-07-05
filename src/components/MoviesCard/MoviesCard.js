import { useState } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

export default function MoviesCard({ movie }) {
  const [isSaved, setIsSaved] = useState(false);

  let location = useLocation();

  const isSaveButton = location.pathname === "/movies";
  const isUnsafeButton = location.pathname === "/saved-movies";

  return (
    <article className="card">
      <img className={isUnsafeButton ? "card__image_saved" : "card__image"} src={movie.image} alt={movie.title} />
      {isUnsafeButton && <button className="card__unsave-button"></button>}
      {isSaveButton && <button className={isSaved ? "card__save-button_saved" : "card__save-button"} onClick={() => setIsSaved(true)} >{isSaved ? "" : "Сохранить"}</button>}
      <div className="card__text-container">
        <h3 className="card__title">{movie.title}</h3>
        <p className="card__duration">{movie.duration}</p>
      </div>
    </article>
  )
}