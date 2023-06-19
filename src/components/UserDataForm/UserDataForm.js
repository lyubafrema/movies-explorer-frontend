import { Link } from "react-router-dom";
import { useValidationAndForm } from "../../hooks/useValidationAndForm";
import './UserDataForm.css';

export default function UserDataForm({ buttonText, helpText, linkText, isRegister, linkPath }) {
  const { values, handleChange, errors, isValid } = useValidationAndForm();
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault() }}>
      <div className={isRegister ? "form__container" : "form__container_hide"}>
        <label className="form__label" htmlFor="name-input">Имя</label>
        <input
          className="form__input"
          type="text"
          onChange={handleChange}
          id="name-input"
          name="name"
          value={values.name || ''}
          minLength="2"
          maxLength="40"
          required
        />
        <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>
          {errors.name}
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
          value={values.email || ''}
          minLength="2"
          maxLength="40"
          required
        />
        <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>
          {errors.email}
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
          value={values.password || ''}
          minLength="6"
          maxLength="200"
          required
        />
        <span className={`form__input-error ${isValid ? "form__input-error" : "form__input-error_active"}`}>
          {errors.password}
        </span>
      </div>

      <button
        className={isRegister ? "form__button form__button_register" : "form__button"}
        aria-label={buttonText}
        type="submit">{buttonText}
      </button>
      <p className="form__text">{helpText}
        <Link className="form__link" to={linkPath}>{linkText}</Link>
      </p>
    </form>
  )
}