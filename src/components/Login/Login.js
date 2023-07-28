import { Link, useNavigate } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import './Login.css';
import { useEffect } from 'react';
import { useValidationAndForm } from '../../hooks/useValidationAndForm';
import { validateEmail } from '../../utils/validation';

export default function Login({ onLogin, isLogged, apiErr, isFormLoading }) {
  const navigate = useNavigate();
  const { errors, isValid, handleChange, values } = useValidationAndForm();

  useEffect(() => {
    if (isLogged) {
      navigate('/movies');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const handleSubmit = () => {
    onLogin(values.email, values.password);
  }

  return (
    <section className="login">
      <div className="login__wrap">
        <div className="login__top">
          <Link className="login__logo-link" to="/">
            <img className="login__logo" src={headerLogo} alt="Логотип: Синий квадрат с улыбкой." />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
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
              disabled={isFormLoading}
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
              disabled={isFormLoading}
              required
            />
            <span className={`form__input-error ${isValid ? "form__input-error" : "form__input-error_active"}`}>
              {errors.password}
            </span>
            <span className="form__api-error">
              {apiErr.login.errorText}
            </span>
          </div>

          <button
            className="form__button"
            aria-label="Войти"
            type="submit"
            disabled={!isValid || isFormLoading || validateEmail(values.email).invalid}
          >Войти
          </button>
          <p className="form__text">Еще не зарегистрированы?
            <Link className="form__link" to="/signup">Регистрация</Link>
          </p>
        </form>
      </div>
    </section>
  )
}