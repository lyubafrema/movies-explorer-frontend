import Navigation from "../Navigation/Navigation";
import headerLogo from '../../images/logo.svg';
import { Link, useLocation } from "react-router-dom";
import NavigationMain from "../NavigationMain/NavigationMain";
import './Header.css';

export default function Header() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  return (
    <header className={`header ${isLanding ? "header_landing" : ""}`}>
      <div className="header__container">
        <Link className="header__logo-link" to="/" >
          <img className="header__logo" src={headerLogo} alt="Логотип: Синий квадрат с улыбкой." />
        </Link>
        {isLanding ? <Navigation /> : <NavigationMain />}
      </div>
    </header>
  )
}
