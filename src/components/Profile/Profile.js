import { useContext, useEffect, useState } from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { useValidationAndForm } from "../../hooks/useValidationAndForm";

export default function Profile({ onSignOut, onUpdateProfile, isServerErr, setIsServerErr, isServerOk, setIsServerOk, apiErr }) {
  const currentUser = useContext(CurrentUserContext);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const { errors, isValid, handleChange, values, setValues } = useValidationAndForm();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateProfile({ email: values.email, name: values.name });
  }

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  useEffect(() => {
    setIsServerErr(false);
  }, [isValid, setIsServerErr]);

  useEffect(() => {
    setIsServerOk(false);
  }, [isServerErr, setIsServerOk]);

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="form profile__form"
        onSubmit={handleSubmit}>
        <div className="profile__form-container">
          <label className="profile__label" htmlFor="name-input">Имя </label>
          <div className="profile__input-container">
            <input
              className="profile__input"
              type="text"
              onChange={handleChange}
              id="name-input"
              name="name"
              value={values.name || ''}
              placeholder="Введите имя"
              minLength="2"
              maxLength="40"
              required
              disabled={!showSaveBtn}
            />
            <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>
              {errors.name}
            </span>
          </div>
        </div>
        <div className="profile__form-container">
          <label className="profile__label" htmlFor="email-input">E-mail</label>
          <div className="profile__input-container">
            <input
              className="profile__input"
              type="email"
              onChange={handleChange}
              id="email-input"
              name="email"
              value={values.email || ''}
              placeholder="Введите email"
              minLength="2"
              maxLength="40"
              required
              disabled={!showSaveBtn}
            />
            <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>
              {errors.email}
            </span>
          </div>
        </div>
        <span className={`profile__success-server ${isServerOk ? "profile__success-server_active" : ""}`}>
          Данные успешно обновлены!
        </span>
        <span className={`profile__error-server ${isServerErr ? "profile__error-server_active" : ""}`}>
          При обновлении профиля произошла ошибка.
        </span>
        <span className="profile__error-server">
          {apiErr.profile.errorText}
        </span>
        <button
          className={!showSaveBtn && !isServerErr ? "profile__navigation-btn" : "profile__navigation-btn profile__navigation-btn_show_not"}
          type="button"
          aria-label="Редактировать"
          onClick={() => {
            setShowSaveBtn(true);
          }}
        >Редактировать</button>
        <button
          className={!showSaveBtn && !isServerErr ?
            "profile__navigation-btn_type_save profile__navigation-btn_show_not"
            : "profile__navigation-btn profile__navigation-btn_type_save"
          }
          disabled={!isValid || (values.name === currentUser.name && values.email === currentUser.email) || isServerErr}
          type="submit"
          aria-label="Сохранить"
          onClick={() => {
            setShowSaveBtn(false);
          }}>Сохранить</button>
      </form>
      <Link
        className={!showSaveBtn && !isServerErr ? "profile__navigation-btn profile__navigation-btn_color_red" : "profile__navigation-btn_show_not"}
        aria-label="Выйти"
        to="/"
        onClick={onSignOut}>Выйти из аккаунта
      </Link>
    </section>
  )
}