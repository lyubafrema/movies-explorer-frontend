import headerLogo from '../../images/logo.svg';
import UserDataForm from "../UserDataForm/UserDataForm";
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <section className="login">
      <div className="login__top">
        <Link className="login__logo-link" to="/">
          <img className="login__logo" src={headerLogo} alt="Логотип: Синий квадрат с улыбкой." />
        </Link>
        <h1 className="login__title">Добро пожаловать!</h1>
      </div>
      <UserDataForm
        buttonText="Зарегистрироваться"
        helpText="Уже зарегистрированы?"
        linkText="Войти"
        isRegister={true}
        linkPath="/signin"
      />
    </section>
  )
}