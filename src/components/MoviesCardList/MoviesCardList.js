import { useLocation } from "react-router-dom";
import useResize from "../../hooks/useResize";
import { movies } from "../../utils/movies";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

export default function MoviesCardList() {
  let size = useResize();
  let location = useLocation();

  const moviesList = location.pathname === "/saved-movies" ? movies.filter((m) => m.isLiked) : movies;

  return (
    <div className="cards-list">
      <div className={"cards-list__container"}>
        {size.width <= 360
          ? moviesList?.slice(0, 5).map((movie) => {
            return <MoviesCard key={movie._id} movie={movie} />;
          })
          : size.width <= 890
            ? moviesList?.slice(0, 8).map((movie) => {
              return <MoviesCard key={movie._id} movie={movie} />;
            })
            : moviesList?.map((movie) => {
              return <MoviesCard key={movie._id} movie={movie} />;
            })}
      </div>
      <button className="cards-list__more-button">Ещё</button>
    </div>
  )
}