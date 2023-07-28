import { useEffect, useState } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

export default function SavedMovies({ savedMovies, handleUnsaveMovie }) {
  const [search, setSearch] = useState({});
  const [searchArrSaved, setSearchArrSaved] = useState([]);

  // получаем сохраненные данные из ls
  const filterMovies = localStorage.getItem("filteredSavedMovies");
  const searchRequest = localStorage.getItem("moviesSearchSavedRequest");

  const [isLoading, setIsLoading] = useState(false);
  const err = false;
  const location = useLocation();

  // cбрасываем значение инпута и историю поиска
  useEffect(() => {
    setSearchArrSaved(savedMovies);
    setSearch({});
    localStorage.removeItem("filteredSavedMovies");
    localStorage.removeItem("moviesSearchSavedRequest")
  }, [savedMovies, location]);

  // устанавливаем значение поиска фильмов
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (filterMovies) {
        setSearchArrSaved(JSON.parse(filterMovies));
      } else {
        setSearchArrSaved(savedMovies);
      }
      setIsLoading(false);
    }, 1000);
  }, [savedMovies, filterMovies, search]);

  // устанавливаем значения чекбокса и поисковой строки
  useEffect(() => {
    if (searchRequest) {
      setSearch(JSON.parse(searchRequest))
    } else {
      setSearch({ ...searchRequest, searchValue: "" });
    }
  }, [savedMovies, searchRequest]);

  // ищем фильмы
  function filteredMovies(searchRequestData) {
    setIsLoading(true);

    setTimeout(() => {
      let searchedMoviesArr = [];
      // сохраняем данные в ls
      localStorage.setItem("moviesSearchSavedRequest", JSON.stringify(searchRequestData));

      if (!searchRequestData) {
        console.log("Значений нет.");
      }

      // поиск с фильтром - отбираем короткометражки - меньше 40 мин.
      if (searchRequestData.isShortMovieChecked) {
        searchedMoviesArr = savedMovies.filter((i) => {
          console.log(searchRequestData);
          return (
            i.nameRU.toLowerCase().trim().includes(searchRequestData.searchValue.toLowerCase()) && i.duration <= SHORT_MOVIE_DURATION
          );
        });
        setSearchArrSaved(searchedMoviesArr);
        localStorage.setItem("filteredSavedMovies", JSON.stringify(searchedMoviesArr));

      } else {
        // поиск без фильтра
        searchedMoviesArr = savedMovies.filter((i) => {
          return i.nameRU.toLowerCase().trim().includes(searchRequestData.searchValue.toLowerCase());
        });
        setSearchArrSaved(searchedMoviesArr);
        localStorage.setItem("filteredSavedMovies", JSON.stringify(searchedMoviesArr));
      }
      setIsLoading(false);
    }, 1000);
  }

  return (
    <section className="movies">
      <div className="movies__wrap">
        <SearchForm
          search={search}
          onSearchMovies={filteredMovies}
        />
        {err && searchArrSaved.length === 0
          ? (<p className="movies__message-text">
            Во время обработки запроса произошла ошибка. Попробуйте позже ещё раз</p>
          ) : ("")}
        {isLoading
          ? (<Preloader />)
          : searchArrSaved.length
            ? (<MoviesCardList
              movies={searchArrSaved}
              handleUnsaveMovie={handleUnsaveMovie}
            />)
            : (filterMovies && <p className="movies__text">Ничего не найдено</p>)
        }
      </div>
    </section>
  )
}
