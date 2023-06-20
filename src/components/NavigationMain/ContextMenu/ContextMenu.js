import { Link, NavLink } from "react-router-dom";
import './ContextMenu.css';

export default function NavigationContextMenu() {
  return (
    <div className="context-menu">
      <nav className="context-menu__container">
        <div className="context-menu__links">
          <NavLink to='/' className={({ isActive }) => `context-menu__link ${isActive ? 'context-menu__link_active' : ''}`} >Главная</NavLink>
          <NavLink to='/movies' className={({ isActive }) => `context-menu__link ${isActive ? 'context-menu__link_active' : ''}`} >Фильмы</NavLink>
          <NavLink to='/saved-movies' className={({ isActive }) => `context-menu__link ${isActive ? 'context-menu__link_active' : ''}`}>Сохранённые фильмы</NavLink>
        </div>
        <Link to='/profile' className='context-menu__link context-menu__link_color_white'>Аккаунт</Link>
      </nav>
    </div>
  )
}