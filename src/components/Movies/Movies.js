import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

export default function Movies() {
  return (
    <section className="movies">
      <div className="movies__wrap">
        <SearchForm />
        <MoviesCardList />
      </div>
    </section>
  )
}