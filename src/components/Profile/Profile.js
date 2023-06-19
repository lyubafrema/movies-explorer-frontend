import { useValidationAndForm } from "../../hooks/useValidationAndForm";
import './Profile.css';

export default function Profile() {
  const { handleChange } = useValidationAndForm();

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Любовь!</h1>
      <form className="profile__form" onSubmit={(e) => { e.preventDefault() }}>
        <div className="profile__form-container">
          <label className="profile__label" htmlFor="name-input">Имя </label>
          <input
            className="profile__input"
            type="text"
            onChange={handleChange}
            id="name-input"
            name="name"
            value="Любовь"
            placeholder="Введите имя"
            minLength="2"
            maxLength="40"
            required
          />
        </div>
        <div className="profile__form-container">
          <label className="profile__label" htmlFor="email-input">E-mail</label>
          <input
            className="profile__input"
            type="email"
            onChange={handleChange}
            id="email-input"
            name="email"
            value="pochta@yandex.ru"
            placeholder="Введите email"
            minLength="2"
            maxLength="40"
            required
          />
        </div>
        <button className="profile__navigation-btn" type="submit" aria-label="Редактировать">Редактировать</button>
        <button className="profile__navigation-btn profile__navigation-btn_red" aria-label="Выйти">Выйти из аккаунта</button>
      </form>
    </section>
  )
}