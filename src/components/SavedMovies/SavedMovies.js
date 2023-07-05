import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies() {
  return (
    <section className="movies">
      <div className="movies__wrap">
        <SearchForm />
        <MoviesCardList />
      </div>
    </section>
  )
}

