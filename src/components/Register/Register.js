import { useEffect } from 'react';
import headerLogo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useValidationAndForm } from '../../hooks/useValidationAndForm';
import { validateEmail, validateName } from '../../utils/validation';

export default function Register({ onRegister, isLogged, apiErr, isSubmitOk, isLoading }) {
  const navigate = useNavigate();
  const { errors, isValid, resetForm, handleChange, values } = useValidationAndForm();

  const handleSubmit = () => {
    onRegister(values.email, values.password, values.name);
  }

  useEffect(() => {
    if (isLogged) {
      navigate('/movies', { replace: true });
    }
  })

  return (
    <section className="login">
      <div className="login__wrap">
        <div className="login__top">
          <Link className="login__logo-link" to="/">
            <img className="login__logo" src={headerLogo} alt="Логотип: Синий квадрат с улыбкой." />
          </Link>
          <h1 className="login__title">Добро пожаловать!</h1>
        </div>
        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          if (isSubmitOk) {
            resetForm();
          }
        }}>
          <div className="form__container">
            <label className="form__label" htmlFor="name-input">Имя</label>
            <input
              className="form__input"
              type="text"
              onChange={handleChange}
              id="name-input"
              name="name"
              placeholder="Введите имя"
              value={values.name || ""}
              minLength="2"
              maxLength="40"
              disabled={isLoading}
              required
            />
            <span className={`form__input-error form__input-error_active`}>
              {validateName(values.name).message}
            </span>
          </div>
          <div className="form__container">
            <label className="form__label" htmlFor="email-input">E-mail</label>
            <input
              className="form__input"
              type="email"
              onChange={handleChange}
              id="email-input"
              name="email"
              placeholder="Введите email"
              value={values.email || ""}
              minLength="2"
              maxLength="40"
              disabled={isLoading}
              required
            />
            <span className={`form__input-error form__input-error_active`}>
              {validateEmail(values.email).message}
            </span>
          </div>
          <div className="form__container">
            <label className="form__label" htmlFor="password-input">Пароль</label>
            <input
              className="form__input"
              type="password"
              onChange={handleChange}
              id="password-input"
              name="password"
              placeholder="Введите пароль"
              value={values.password || ""}
              minLength="6"
              maxLength="200"
              disabled={isLoading}
              required
            />
            <span className={`form__input-error ${isValid ? "form__input-error" : "form__input-error_active"}`}>
              {errors.password}
            </span>
            <span className="form__api-error">
              {apiErr.register.errorText}
            </span>
          </div>
          <button
            className="form__button form__button_place_register"
            aria-label="Зарегистрироваться"
            type="submit"
            disabled={!isValid || isLoading || validateName(values.name).message || validateEmail(values.email).message}
          >Зарегистрироваться
          </button>
          <p className="form__text">Уже зарегистрированы?
            <Link className="form__link" to="/signin">Войти</Link>
          </p>
        </form>
      </div>
    </section>
  )
}