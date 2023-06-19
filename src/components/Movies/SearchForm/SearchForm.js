import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

export default function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <input className="search-form__input" type="text" placeholder="Фильм" />
        <button className="search-form__button" type="submit" ></button>
      </div>
      <div className="search-form__checkbox-container">
        <FilterCheckbox />
        <p className="search-form__checkbox-text">Короткометражки</p>
      </div>
    </form>
  )
}