import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

export default function Movies({ movies, savedMovies, handleSaveMovie, handleUnsaveMovie, apiErr }) {
  const [searchArr, setSearchArr] = useState([]);
  const [search, setSearch] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // получаем сохраненные данные из ls
  const filterMovies = localStorage.getItem("filteredMovies");
  const searchRequest = localStorage.getItem("moviesSearchRequest");

  // устанавливаем значение поиска фильмов, если оно уже есть в ls
  useEffect(() => {
    if (filterMovies) {
      setSearchArr(JSON.parse(filterMovies));
    }
  }, [filterMovies]);

  // устанавливаем значения чекбокса и поисковой строки, если они уже есть в ls
  useEffect(() => {
    // console.log(searchRequest);
    if (searchRequest) {
      setSearch(JSON.parse(searchRequest));
    }
  }, [searchRequest]);

  // ищем фильмы
  function filteredMovies(searchRequestData) {
    if (!searchArr.length) {
      setIsLoading(true);
    }

    setTimeout(() => {
      let searchedMoviesArr = [];
      // сохраняем данные в ls при каждом сабмите
      localStorage.setItem("moviesSearchRequest", JSON.stringify(searchRequestData));

      if (!searchRequestData) {
        console.log("Значений нет.");
      }
      // поиск с фильтром - отбираем короткометражки - меньше 40 мин.
      if (searchRequestData.isShortMovieChecked) {
        searchedMoviesArr = movies.filter((i) => {
          return (
            i.nameRU.toLowerCase().trim().includes(searchRequestData.searchValue.toLowerCase())
            && i.duration <= 40
          );
        });
        // console.log(searchedMoviesArr);
        setSearchArr(searchedMoviesArr);
        //что нашли - записываем в ls
        localStorage.setItem("filteredMovies", JSON.stringify(searchedMoviesArr));

      } else if (!searchRequestData.isShortMovieChecked) {
        // поиск без фильтра
        searchedMoviesArr = movies.filter((i) => {
          return (
            i.nameRU.toLowerCase().trim().includes(searchRequestData.searchValue.toLowerCase())
          );
        });
        // console.log(searchedMoviesArr);
        setSearchArr(searchedMoviesArr);
        //что нашли - записываем в ls
        localStorage.setItem("filteredMovies", JSON.stringify(searchedMoviesArr));

      } else setSearchArr(movies);

      setIsLoading(false);
    }, searchArr.length ? 0 : 300);
  }

  // // cбрасываем значение инпута и историю поиска
  // const handleClearInput = () => {
  //   setSearchArr([]);
  //   setSearch({});
  //   localStorage.removeItem("filteredMovies");
  //   localStorage.removeItem("searchRequest");
  // };

  return (
    <section className="movies">
      <div className="movies__wrap">
        <SearchForm
          search={search}
          onSearchMovies={filteredMovies} />
        {apiErr.movies
          ? (<p className="movies__api-error">{apiErr.movies.text}</p>)
          : ("")}
        {isLoading
          ? (<Preloader />)
          : searchArr.length
            ? (<MoviesCardList
              movies={searchArr}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleUnsaveMovie={handleUnsaveMovie}
            />)
            : (<p className="movies__text">Ничего не найдено</p>)
        }
      </div>
    </section>
  )
}