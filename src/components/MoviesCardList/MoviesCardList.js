import useResize from "../../hooks/useResize";
import { CARDS_QUANTITY_TO_ADD_DESKTOP, CARDS_QUANTITY_TO_ADD_TAB_MOBILE, DESKTOP_SCREEN_CARDS_QUANTITY, DESKTOP_SCREEN_WIDTH, MAX_MOBILE_SCREEN_WIDTH, MAX_TABLET_SCREEN_WIDTH, MOBILE_SCREEN_CARDS_QUANTITY, TABLET_SCREEN_CARDS_QUANTITY } from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useEffect, useMemo, useState } from "react";

export default function MoviesCardList({ movies, savedMovies, handleSaveMovie, handleUnsaveMovie }) {
  let size = useResize();
  const [countMoreMovies, setCountMoreMovies] = useState(0);

  useEffect(() => {
    setCountMoreMovies(0);
  }, [movies]);

  const moviesOnButtonClick = useMemo(() => {
    const clickCounter =
      size.width <= MAX_MOBILE_SCREEN_WIDTH
        ? MOBILE_SCREEN_CARDS_QUANTITY
        : size.width <= MAX_TABLET_SCREEN_WIDTH
          ? TABLET_SCREEN_CARDS_QUANTITY
          : DESKTOP_SCREEN_CARDS_QUANTITY;
    return movies.slice(0, clickCounter + countMoreMovies);
  }, [movies, countMoreMovies, size]);

  const showMoreCards = () => {
    let countAddMoreMovies;
    if (size.width >= DESKTOP_SCREEN_WIDTH) {
      countAddMoreMovies = CARDS_QUANTITY_TO_ADD_DESKTOP;
    } else countAddMoreMovies = CARDS_QUANTITY_TO_ADD_TAB_MOBILE;

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
      {movies.length !== moviesOnButtonClick.length
        ? (<button className="cards-list__more-button" onClick={showMoreCards}>Ещё</button>)
        : ""
      }
    </div>
  )
}