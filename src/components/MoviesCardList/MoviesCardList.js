// import { useLocation } from "react-router-dom";
import useResize from "../../hooks/useResize";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useEffect, useMemo, useState } from "react";

export default function MoviesCardList({ movies, savedMovies, handleSaveMovie, handleUnsaveMovie }) {
  let size = useResize();
  // let location = useLocation();
  const [countMoreMovies, setCountMoreMovies] = useState(0);
  const [initialMoviesList, setInitialMoviesList] = useState(0);

  // const moviesList = location.pathname === "/saved-movies" ? movies.filter((m) => m.isLiked) : movies;
  useEffect(() => {
    setCountMoreMovies(0);
    // console.log(movies, savedMovies)
  }, [movies]);

  const moviesOnButtonClick = useMemo(() => {
    const clickCounter =
      size.width < 480
        ? 2
        : size.width < 1280
          ? 8
          : 12;
    setInitialMoviesList(clickCounter);
    return movies.slice(0, clickCounter + countMoreMovies);
  }, [movies, countMoreMovies, size]);

  const showMoreCards = () => {
    let countAddMoreMovies;
    if (size.width > 768) {
      countAddMoreMovies = 3;
    } else countAddMoreMovies = 2;

    setCountMoreMovies((prev) => prev + countAddMoreMovies);
  }

  return (
    <div className="cards-list">
      <div className="cards-list__container">
        {moviesOnButtonClick.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleUnsaveMovie={handleUnsaveMovie}
            />
          );
        })}
      </div>
      {movies.length >= initialMoviesList && movies.length !== moviesOnButtonClick.length
        ? (<button className="cards-list__more-button" onClick={showMoreCards}>Ещё</button>)
        : ""
      }
    </div>
  )
}