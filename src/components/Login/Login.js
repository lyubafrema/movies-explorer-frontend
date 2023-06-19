import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import UserDataForm from "../UserDataForm/UserDataForm";
import './Login.css';

export default function Login() {
  return (
    <section className="login">
      <div className="login__top">
        <Link className="login__logo-link" to="/">
          <img className="login__logo" src={headerLogo} alt="Логотип: Синий квадрат с улыбкой." />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <UserDataForm
        buttonText="Войти"
        helpText="Ещё не зарегистрированы?"
        linkText="Регистрация"
        isRegister={false}
        linkPath="/signup"
      />
    </section>
  )
}