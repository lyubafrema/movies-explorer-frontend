import { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

export default function SearchForm({ search, onSearchMovies }) {
  const [errText, setErrText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const isShortCheck = JSON.parse(localStorage.getItem("shortMovieCheckBox"));
  const [isShortMovieChecked, setIsShortMovieChecked] = useState(isShortCheck);

  // подставляем текст поиска при монтировании компонента
  useEffect(() => {
    if (search.searchValue) {
      setSearchValue(search.searchValue);
    } else {
      setSearchValue("");
    }
  }, [search.searchValue])

  // функция изменения инпута
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  // функция чекбокса короткометражек
  const checkShortMovie = () => {
    if (searchValue !== "") {
      setIsShortMovieChecked(!isShortMovieChecked);
      onSearchMovies({ searchValue: searchValue, isShortMovieChecked: !isShortMovieChecked });
    } else {
      setIsShortMovieChecked(!isShortMovieChecked);
      onSearchMovies({ searchValue: search.searchValue, isShortMovieChecked: !isShortMovieChecked });
    }
    console.log(isShortMovieChecked);
  }

  // функция сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) {
      setErrText("Введите ключевое слово для поиска");
      return;
    } else {
      onSearchMovies({ searchValue, isShortMovieChecked });
    }
  };

  return (
    <div className="search-form">
      <form
        className="search-form__main"
        onSubmit={handleSubmit}>
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            type="text"
            name="search-form"
            id="search-form"
            placeholder="Фильм"
            onChange={handleChange}
            value={searchValue || ''}
          />
          <button
            className="search-form__button"
            type="submit"
          // disabled={!search}
          ></button>
        </div>
        <div className="search-form__checkbox-container">
          <FilterCheckbox
            isChecked={search.isShortMovieChecked}
            handleShortCheck={checkShortMovie}
          />
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </form>
      <span className="search-form__error-text">{errText}</span>
    </div>
  )
}