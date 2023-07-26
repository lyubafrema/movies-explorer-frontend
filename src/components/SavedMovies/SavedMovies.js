import { useEffect, useState } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({ savedMovies, handleUnsaveMovie }) {
  const [search, setSearch] = useState({});
  const [searchArrSaved, setSearchArrSaved] = useState([]);

  // получаем сохраненные данные из ls
  const filterMovies = localStorage.getItem("filteredSavedMovies");
  const searchRequest = localStorage.getItem("moviesSearchSavedRequest");

  const [isLoading, setIsLoading] = useState(false);
  const err = false;

  // устанавливаем значение поиска фильмов
  useEffect(() => {
    if (filterMovies) {
      setSearchArrSaved(JSON.parse(filterMovies));
    } else {
      setSearchArrSaved(savedMovies);
    }
  }, [savedMovies, filterMovies, search]);

  // устанавливаем значения чекбокса и поисковой строки, если они уже есть в ls
  useEffect(() => {
    if (searchRequest) {
      setSearch(JSON.parse(searchRequest));
    } else {
      setSearch({ searchValue: "", ...searchRequest, });
    }
  }, [savedMovies, searchRequest]);

  // ищем фильмы
  function filteredMovies(searchRequestData) {
    if (!searchArrSaved.length) {
      setIsLoading(true);
    }

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
          return (
            i.nameRU.toLowerCase().trim().includes(searchRequestData.searchValue.toLowerCase()) && i.duration <= 40
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
    }, searchArrSaved.length ? 0 : 300);
  }

  // // cбрасываем значение инпута и историю поиска
  // const handleClearInput = () => {
  //   setSearch({});
  //   filteredMovies(movies);
  //   localStorage.removeItem('filteredSavedMovies');
  //   localStorage.removeItem('moviesSearchSavedRequest');
  // };

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
