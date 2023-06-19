import { Link, NavLink } from "react-router-dom";
import './ContextMenu.css';

export default function NavigationContextMenu() {
  return (
    <div className="context-menu">
      <nav className="context-menu__container">
        <div className="context-menu__links">
          <NavLink to='/' className={({ isActive }) => `navigation__link navigation__link_context ${isActive ? 'navigation__link_active' : ''}`} >Главная</NavLink>
          <NavLink to='/movies' className={({ isActive }) => `navigation__link navigation__link_context ${isActive ? 'navigation__link_active' : ''}`} >Фильмы</NavLink>
          <NavLink to='/saved-movies' className={({ isActive }) => `navigation__link navigation__link_context ${isActive ? 'navigation__link_active' : ''}`}>Сохранённые фильмы</NavLink>
        </div>
        <Link to='/profile' className='navigation__link navigation__link_white'>Аккаунт</Link>
      </nav>
    </div>
  )
}